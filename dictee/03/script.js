// Attend que le contenu de la page soit entièrement chargé avant d'exécuter le code
document.addEventListener('DOMContentLoaded', function() {
    // Récupération des éléments du DOM
    const taskDateCheckbox = document.getElementById('taskDate');
    const dateInput = document.getElementById('date');
    const addButton = document.getElementById('addTask');
    const deleteButton = document.getElementById('deleteTask');
    const taskList = document.querySelector('.content .task');
    const contentTaskInput = document.getElementById('contentTask');
    const dateChoiceInput = document.getElementById('dateChoice');

    // Définit la date actuelle comme valeur par défaut pour les champs de date
    const currentDate = new Date().toISOString().split('T')[0];
    dateInput.value = formatDateFrench(currentDate);
    dateChoiceInput.value = formatDateFrench(currentDate);

    // Ajout des écouteurs d'événements pour les actions de l'utilisateur
    addButton.addEventListener('click', addTask);
    deleteButton.addEventListener('click', deleteTask);
    taskDateCheckbox.addEventListener('click', toggleAllTasksSelection);
    dateInput.addEventListener('change', filterTasks);
    dateChoiceInput.addEventListener('change', filterTasks);
    contentTaskInput.addEventListener('keyup', function(event) {
        if (event.keyCode === 13) { // Touche 'Enter' pressée
            addTask();
        }
    });

    taskList.addEventListener('change', toggleTaskStatus);
    
    // Fonction pour ajouter une nouvelle tâche
    function addTask() {
        // Récupérer le texte de la tâche et la date sélectionnée par l'utilisateur
        const taskText = contentTaskInput.value.trim();
        const taskDate = dateChoiceInput.value;
        
        // Récupérer la date d'aujourd'hui
        const today = new Date();
        today.setHours(0, 0, 0, 0);
    
        // Convertir la date de la tâche en objet Date
        const taskDateObj = new Date(taskDate);
    
        // Vérifier si le texte de la tâche et la date ont été saisis et si la date n'est pas antérieure à la date actuelle
        if (taskText && taskDateObj.getTime() >= today.getTime()) {
            // Créer un nouvel élément de tâche
            const taskItem = document.createElement('div');
            taskItem.innerHTML = `<input type="checkbox"> <span>${taskText}</span>`;
            taskItem.setAttribute('data-date', taskDate);
            
            // Ajouter la nouvelle tâche à la liste des tâches
            taskList.appendChild(taskItem);
            
            // Effacer le champ de saisie après avoir ajouté la tâche
            contentTaskInput.value = ''; 
        } else if(taskDate === null){
            // Afficher un message d'alerte si la date sélectionnée est antérieure à la date actuelle ou si des champs sont vides
            alert("Veuillez sélectionner une date valide pour la tâche !");
        }else{
            // Afficher un message d'alerte si la date sélectionnée est antérieure à la date actuelle ou si des champs sont vides
            alert("Veuillez saisir une tâche  !");
        }
    }
    
    // Fonction pour supprimer une tâche
    function deleteTask() {
        const selectedTask = taskList.querySelector('input[type="checkbox"]:checked');
        if (selectedTask) {
            selectedTask.parentElement.remove();
        }
    }

    // Fonction pour filtrer les tâches par date
    function filterTasks() {
        const taskDate = dateInput.value || dateChoiceInput.value;
        const tasks = taskList.querySelectorAll('.task');

        tasks.forEach(task => {
            const taskDateAttr = task.getAttribute('data-date');
            if (!taskDate || taskDateAttr === taskDate) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        });
    }

    // Fonction pour basculer la sélection de toutes les tâches
    function toggleAllTasksSelection() {
        const checkboxes = taskList.querySelectorAll('input[type="checkbox"]');
        const taskDate = dateInput.value || dateChoiceInput.value;
        
        if (taskDateCheckbox.checked) {
            checkboxes.forEach(checkbox => {
                checkbox.checked = true;
            });
        } else {
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
        }
    }

    // Stocker l'indice de la tâche lorsqu'elle est déplacée vers le bas
    const taskIndices = new Map();

    // Fonction pour basculer l'état d'une tâche (terminée ou non)
    function toggleTaskStatus(event) {
        if (event.target.type === 'checkbox') {
            const taskItem = event.target.parentElement;
            const isChecked = event.target.checked;

            if (isChecked) {
                taskItem.classList.add('completed-task');
                // Déplacer la tâche terminée à la fin de la liste
                taskList.appendChild(taskItem);
                // Stocker l'indice de la tâche
                taskIndices.set(taskItem, Array.from(taskList.children).indexOf(taskItem));
            } else {
                taskItem.classList.remove('completed-task');
                // Récupérer l'indice de la tâche
                const originalIndex = taskIndices.get(taskItem);
                // Insérer la tâche à sa position d'origine
                if (originalIndex !== undefined) {
                    const referenceNode = taskList.children[originalIndex];
                    taskList.insertBefore(taskItem, referenceNode);
                }
                // Supprimer l'entrée de l'indice de la tâche
                taskIndices.delete(taskItem);
            }
        }
    }

    // Fonction pour formater la date en format français (jj/mm/aaaa)
    function formatDateFrench(date) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(date).toLocaleDateString('fr-FR', options);
    }
});
