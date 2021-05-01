import React, { useState, useEffect } from "react";

export function Home() {
	let [listaTareas, setListaTareas] = useState([]);
	let [tarea, setTarea] = useState("");
	const [contador, setContador] = useState(0);
	useEffect(() => {
		getTareas();
	}, []);
	function getTareas() {
		var requestOptions = {
			method: "GET",
			redirect: "follow"
		};
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/gab20031995",
			requestOptions
		)
			.then(response => response.json())
			.then(result => setListaTareas(result))
			.catch(error => console.log("error", error));
	}
	const enviar = () => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		var raw = JSON.stringify(listaTareas);
		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/gab20031995",
			requestOptions
		)
			.then(response => response.json())
			.then(result => console.log(result))
			.catch(error => console.log("error", error));
	};
	const agregar = () => {
		if (tarea == "") {
			alert("Digite la tarea que desea ingresar");
		} else {
			setListaTareas([...listaTareas, {}]);
			setTarea("");
		}
	};
	console.log(listaTareas);
	enviar();
	const eliminar = i => {
		const nuevaTarea = [...listaTareas];
		nuevaTarea.splice(i, 1);
		setListaTareas(nuevaTarea);
		setContador(contador - 1);
	};
	const eliminarTodo = () => {
		listaTareas = [];
		setListaTareas([...listaTareas, {}]);
		enviar();
		console.log(listaTareas);
	};
	return (
		<div
			className="text-center mt-5 bg-transparent"
			style={{ width: "360px", margin: "auto" }}>
			<h1 className="text-white">Lista de Tareas </h1>
			<div className="text-white">
				{listaTareas.length + "  Tareas pendientes por hacer"}
			</div>
			<input
				placeholder="Ingrese su tarea"
				onChange={e => setTarea(e.target.value)}
				value={tarea}></input>
			<button onClick={agregar}>Agregar tarea</button>
			<ul className="list-group">
				{listaTareas.map((item, index) => {
					return (
						<li key={index} className="text-white">
							{item.label}
							<button
								className="remove"
								onClick={() => eliminar(index)}>
								❌
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
