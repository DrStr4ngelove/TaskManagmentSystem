//App.js

import React from "react";
import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
} from "@apollo/client";
import "./App.css";
import { useAppProps } from "./hooks";

function App() {
	const { loading, error, newTask, setNewTask, handleCreateTask, data, handleDeleteTask, handleUpdateTask } = useAppProps();
	
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div>
			<h1>Jameson Blake Collins</h1>
			<h3>Task Manager</h3>
			<div>
				<h2>Create Task</h2>
				<input
					type="text"
					placeholder="Title"
					value={newTask.title}
					onChange={(e) =>
						setNewTask({ ...newTask, title: e.target.value })
					}
				/>
				<input
					type="text"
					placeholder="Description"
					value={newTask.description}
					onChange={(e) =>
						setNewTask({ ...newTask, description: e.target.value })
					}
				/>
				<button onClick={handleCreateTask}>Create</button>
			</div>
			<div>
				<h2>Tasks</h2>
				<ul>
					{data.tasks.map((task) => (
						<li key={task.id}>
							{task.title} - {task.description}
							<button onClick={() => handleDeleteTask(task.id)}>
								Delete
							</button>
							<button
								onClick={() => {
									const updatedTitle = prompt(
										"Enter new title:",
										task.title
									);
									const updatedDescription = prompt(
										"Enter new description:",
										task.description
									);
									handleUpdateTask(
										task.id,
										updatedTitle,
										updatedDescription
									);
								}}
							>
								Update
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

const client = new ApolloClient({
	uri: "http://localhost:3001/graphql",
	cache: new InMemoryCache(),
});

function ApolloApp() {
	return (
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	);
}
export default ApolloApp;
