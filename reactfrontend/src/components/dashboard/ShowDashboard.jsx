import React from 'react';
import { Card, Title, Text, BarChart, LineChart, DonutChart, Grid, Col } from '@tremor/react';
import Cards from './das';


const Dashboard = () => {
  // Datos de ejemplo para los gráficos
  const barChartData = [
    { category: 'Enero', ventas: 50 },
    { category: 'Febrero', ventas: 80 },
    { category: 'Marzo', ventas: 65 },
  ];

  const lineChartData = [
    { date: '2024-01-01', value: 30 },
    { date: '2024-02-01', value: 60 },
    { date: '2024-03-01', value: 50 },
  ];

  const donutChartData = [
    { name: 'Producto A', value: 50 },
    { name: 'Producto B', value: 35 },
    { name: 'Producto C', value: 25 },
  ];

  return (
    <div className="p-6">
      <Title>Dashboard</Title>

      <Grid numItems={2} className="gap-6 mt-6">
        {/* Tarjetas */}
        <Col numColSpan={1}>
          <Card>
            <Title>Total Ventas</Title>
            <Text>$15,000</Text>
          </Card>
        </Col>
        <Col numColSpan={1}>
          <Card>
            <Title>Nuevos Usuarios</Title>
            <Text>150</Text>
          </Card>
        </Col>
      </Grid>

      <Grid numItems={3} className="gap-6 mt-6">
        {/* Gráficos */}
        <Col numColSpan={1}>
          <Card>
            <Title>Ventas por Mes</Title>
            <BarChart data={barChartData} category="ventas" index="category" />
          </Card>
        </Col>
        <Col numColSpan={1}>
          <Card>
            <Title>Usuarios Activos</Title>
            <LineChart data={lineChartData} category="value" index="date" />
          </Card>
        </Col>
        <Col numColSpan={1}>
          <Card>
            <Title>Distribución de Productos</Title>
            <DonutChart data={donutChartData} category="value" index="name" />
          </Card>
        </Col>
      </Grid>
    </div>
  );
};

export default Dashboard;
