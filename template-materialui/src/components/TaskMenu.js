import React, { useState, useEffect } from 'react';
import './TaskMenu.css'; 

const tasks = [
  { id: 1, name: 'Tarefa 1', description: 'Descrição da Tarefa 1', startDate: '2022-01-01', endDate: '2022-01-02', status: 'Concluída', resource: 'Recurso 1' },
  { id: 2, name: 'Tarefa 2', description: 'Descrição da Tarefa 2', startDate: '2022-01-03', endDate: '2022-01-04', status: 'Em Andamento', resource: 'Recurso 2' },
  { id: 3, name: 'Tarefa 3', description: 'Descrição da Tarefa 3', startDate: '2022-01-04', endDate: '2022-01-05', status: 'Em Andamento', resource: 'Recurso 3' },
  { id: 4, name: 'Tarefa 4', description: 'Descrição da Tarefa 4', startDate: '2022-01-05', endDate: '2022-01-06', status: 'Em Andamento', resource: 'Recurso 4' },
  { id: 5, name: 'Tarefa 5', description: 'Descrição da Tarefa 5', startDate: '2022-01-06', endDate: '2022-01-07', status: 'Em Andamento', resource: 'Recurso 5' },
  { id: 6, name: 'Tarefa 6', description: 'Descrição da Tarefa 6', startDate: '2022-01-07', endDate: '2022-01-08', status: 'Aguardando', resource: 'Recurso 6' }
];

const TaskMenu = () => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const newTimeLeft = tasks.reduce((acc, task) => {
        const deadline = new Date(task.endDate);
        const difference = deadline - now;
        let timeLeftMessage;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / 1000 / 60) % 60);
          timeLeftMessage = `${days}d ${hours}h ${minutes}m`;
        } else {
          timeLeftMessage = 'Prazo expirado';
        }

        acc[task.id] = timeLeftMessage;
        return acc;
      }, {});

      setTimeLeft(newTimeLeft);
    };

    const timer = setInterval(calculateTimeLeft, 60000);

    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="task-menu">
      <h2>Tarefas</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Data de Início</th>
            <th>Data de Finalização</th>
            <th>Status</th>
            <th>Recurso</th>
            <th>Tempo Restante</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td>{task.startDate}</td>
              <td>{task.endDate}</td>
              <td>{task.status}</td>
              <td>{task.resource}</td>
              <td>{timeLeft[task.id]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskMenu;
