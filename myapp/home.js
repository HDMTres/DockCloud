const express = require('express');
const app = express();// Exemple de données d'employés

const employees = [
	{ id: 1, firstName: 'HDM', lastName: 'Toure', emailId: 'hdm.toure@example.com' },
	{ id: 2, firstName: 'Corto', lastName: 'Bruzda', emailId: 'Corto.bruzd@example.com' },
	{ id: 3, firstName: 'Rayan', lastName: 'Din', emailId: 'ryan.din@example.com' },
	{ id: 4, firstName: 'Kadero', lastName: 'Jams', emailId: 'kadero.jams@example.com' },
	{ id: 5, firstName: 'Celia', lastName: 'Jamsy', emailId: 'Celia.jmsy@example.com' }
	
];

// Route pour récupérer tous les employés == READ

app.get('/api/v1/employees', (req, res) => {
  res.json(employees);
});

// Route pour récupérer un employé spécifique == READ
app.get('/api/v1/employees/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const employee = employees.find(emp => emp.id === id);
	if (employee) {
	  res.json(employee);
	} else {
	  res.sendStatus(404);
	}
  });
  

  
// Port d'écoute pour l'API
const port = 8081;
app.listen(port, () => {
 console.log(`API ecoute sur le port ${port}`);
});

// DELETE
app.delete('/api/v1/employees/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const index = employees.findIndex(emp => emp.id === id);
	if (index !== -1) {
	  employees.splice(index, 1);
	  res.sendStatus(204);
	} else {
	  res.sendStatus(404);
	}
  });

  // UPDATE
app.put('/api/v1/employees/:id', (req, res) => {
	const { id } = req.params;
	const employeeIndex = employees.findIndex(emp => emp.id === parseInt(id));
	if (employeeIndex === -1) {
	  return res.status(404).json({ message: `Employe avec l'id ${id} n'est pas trouver` });
	}
	const { firstName, lastName, emailId } = req.body;
	if (!firstName || !lastName || !emailId) {
	  return res.status(400).json({ message: 'Tous les champs sont requis' });
	}
	const updatedEmployee = {
	  id: parseInt(id),
	  firstName,
	  lastName,
	  emailId
	};
	employees[employeeIndex] = updatedEmployee
	res.json(updatedEmployee);
  });
  
  // CREATE
  app.post('/api/v1/employees', (req, res) => {
	const { firstName, lastName, emailId } = req.body;
	if (!firstName || !lastName || !emailId) {
	  return res.status(400).json({ message: 'Tous les champs sont requis' });
	}
	const newEmployee = {
	  id: employees.length + 1,
	  firstName,
	  lastName,
	  emailId
	};
	employees.push(newEmployee);
	res.status(201).json(newEmployee);
  });
  
  