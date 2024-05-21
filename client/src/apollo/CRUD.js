import {
	gql,
} from "@apollo/client";

export const GET_TASKS = gql`
	query {
		tasks {
			id
			title
			description
		}
	}
`;

export const CREATE_TASK = gql`
	mutation CreateTask($title: String!, $description: String!) {
		createTask(title: $title, description: $description) {
			id
			title
			description
		}
	}
`;

export const DELETE_TASK = gql`
	mutation DeleteTask($id: ID!) {
		deleteTask(id: $id)
	}
`;

export const UPDATE_TASK = gql`
	mutation UpdateTask($id: ID!, $title: String, $description: String) {
		updateTask(id: $id, title: $title, description: $description) {
			id
			title
			description
		}
	}
`;
