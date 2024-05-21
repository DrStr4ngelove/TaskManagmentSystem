
import React, { useState } from "react";
import { GET_TASKS, CREATE_TASK, DELETE_TASK, UPDATE_TASK } from "./apollo/CRUD";
import {
	useQuery,
	useMutation,
} from "@apollo/client";
import "./App.css";

export const useAppProps = () => {
    const { loading, error, data } = useQuery(GET_TASKS);
	const [createTask] = useMutation(CREATE_TASK);
	const [deleteTask] = useMutation(DELETE_TASK);
	const [updateTask] = useMutation(UPDATE_TASK);

	const [newTask, setNewTask] = useState({ title: "", description: "" });
	const handleCreateTask = () => {
		createTask({
			variables: newTask,
			refetchQueries: [{ query: GET_TASKS }],
		});
		setNewTask({ title: "", description: "" });
	};

	const handleDeleteTask = (id) => {
		deleteTask({
			variables: { id },
			refetchQueries: [{ query: GET_TASKS }],
		});
	};

	const handleUpdateTask = (id, title, description) => {
		updateTask({
			variables: { id, title, description },
			refetchQueries: [{ query: GET_TASKS }],
		});
	};
    return { loading, error, newTask, setNewTask, handleCreateTask, data, handleDeleteTask, handleUpdateTask }
}