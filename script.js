document.addEventListener("DOMContentLoaded", function () {
	
	const citySelect = document.getElementById("city-select");
	const departmentSelect = document.getElementById("dep-select");
	const staffSelect = document.getElementById("staff-select");

	// Загрузка сохраненных значений из Cookie
	const savedSelection = JSON.parse(getCookie("selection"));
	console.log("Saved Selection:", savedSelection);
	if (savedSelection) {
			citySelect.value = savedSelection.city;
			departmentSelect.value = savedSelection.department;
			staffSelect.value = savedSelection.staff;
	}

	// База данных с информацией о городах, цехах и сотрудниках
	const database = {
		sev: {
			name: "Севастополь",
			departments: {
				rel: {
					name: "Выпускающий",
					employees: ["Иванов", "Смирнов", "Кузнецов"]
				}
			}
		},
		sim: {
			name: "Симферополь",
			departments: {
				rel: {
					name: "Выпускающий",
					employees: ["Попов", "Васильев", "Петров"]
				}
			}
		},
		yal: {
			name: "Ялта",
			departments: {
				pre: {
					name: "Заготовительный",
					employees: ["Соколов", "Михайлов", "Новиков"]
				},
				rel: {
					name: "Выпускающий",
					employees: ["Федоров", "Морозов", "Волков"]
				},
			}
		},
		alu: {
			name: "Алушта",
			departments: {
				pre: {
					name: "Заготовительный",
					employees: ["Алексеев", "Лебедев", "Семенов"]
				},
				rel: {
					name: "Выпускающий",
					employees: ["Егоров", "Павлов", "Козлов"]
				}
			},
		},
		dja: {
		name: "Джанкой",
			departments: {
				pre: {
					name: "Заготовительный",
					employees: ["Степанов", "Николаев", "Орлов"]
				},
				pro: {
					name: "Обрабатывающий",
					employees: ["Андреев", "Макаров", "Никитин"]
				}
			}
		},
		evp: {
			name: "Евпатория",
			departments: {
				pre: {
					name: "Заготовительный",
					employees: ["Захаров", "Зайцев", "Соловьев"]
				},
				pro: {
					name: "Обрабатывающий",
					employees: ["Борисов", "Яковлев", "Григорьев"]
				}
			}
		},
	};

	// Функция для обновления полей в Cookie и сохранения значений
	function updateAndSaveSelection() {
		const selectedValues = {
			city: citySelect.value,
			department: departmentSelect.value,
			staff: staffSelect.value
		};
		setCookie("selection", JSON.stringify(selectedValues), 30); // Cookie хранит выбранные значения на 30 дней
		console.log("Updated and Saved Selection:", selectedValues);
	}

	// Заполняем список "Город"
	for (const cityId in database) {
		const cityName = database[cityId].name;
		const option = document.createElement("option");
		option.value = cityId;
		option.textContent = cityName;
		citySelect.appendChild(option);
	}

	// Обновление списка "Цех" и "Сотрудник" и сохранение значений
	function updateDepartmentAndStaff() {
		const selectedCityId = citySelect.value;
		if (selectedCityId) {
			const selectedCity = database[selectedCityId];
			departmentSelect.innerHTML = "";
			staffSelect.innerHTML = "";

			for (const departmentId in selectedCity.departments) {
				const departmentName = selectedCity.departments[departmentId].name;
				const option = document.createElement("option");
				option.value = departmentId;
				option.textContent = departmentName;
				departmentSelect.appendChild(option);
			}

			updateStaff();
			updateAndSaveSelection(); // Сохраняем выбранные значения
		}
	}

	// Обновление списка "Сотрудник" и сохранение значений
	function updateStaff() {
		const selectedCityId = citySelect.value;
		const selectedDepartmentId = departmentSelect.value;
		if (selectedCityId && selectedDepartmentId) {
			const selectedDepartment = database[selectedCityId].departments[selectedDepartmentId];
			staffSelect.innerHTML = "";

			selectedDepartment.employees.forEach(employee => {
				const option = document.createElement("option");
				option.value = employee;
				option.textContent = employee;
				staffSelect.appendChild(option);
			});

			updateAndSaveSelection() // Сохраняем выбранные значения
		}
	}

	// Обновление списка "Цех" при выборе "Город"
	citySelect.addEventListener("change", updateDepartmentAndStaff);

	// Обновление списка "Сотрудник" при выборе "Цех"
	departmentSelect.addEventListener("change", updateStaff);

	// Вызыв события change, чтобы обновить поля при загрузке страницы
	const event = new Event("change");
	citySelect.dispatchEvent(event);
});

// Установка Cookie
function setCookie(name, value, days) {
	const expires = new Date();
	expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + value + ";expires=" + expires.toUTCString();
}

// Получение Cookie по имени
function getCookie(name) {
	const cookies = document.cookie.split("; ");
	for (const cookie of cookies) {
		const [cookieName, cookieValue] = cookie.split("=");
		if (cookieName === name) {
			return cookieValue;
		}
	}
	return null;
}
