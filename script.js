import { jsPDF } from 'jspdf';
import Papa from 'papaparse';

const exercises = {
    "Peito": [
        { name: "Flexão Tradicional", link: "https://www.youtube.com/watch?v=IODxDxX7oi4" },
        { name: "Flexão Diamante", link: "https://www.youtube.com/watch?v=J0DnG1_S92I" },
        { name: "Flexão Arqueiro", link: "https://www.youtube.com/watch?v=wgVJp6TvVMI" },
        { name: "Flexão Declinada", link: "https://www.youtube.com/watch?v=wj3LPjTmQOg" },
        { name: "Flexão Explosiva", link: "https://www.youtube.com/watch?v=Eh00_rniF8E" },
        { name: "Flexão Isométrica", link: "https://www.youtube.com/watch?v=L-dYzTRwNQE" },
        { name: "Flexão com Joelho no Chão", link: "https://www.youtube.com/watch?v=ZxvN-Mq2G2o" },
        { name: "Flexão T", link: "https://www.youtube.com/watch?v=5r-2j8J_8QY" },
        { name: "Flexão com Batida de Mão", link: "https://www.youtube.com/watch?v=8iPEnn-ltC8" },
        { name: "Flexão 'Palms'", link: "https://www.youtube.com/watch?v=KwMckd8bE8o" }
    ],
    "Costas": [
        { name: "Remada Australiana", link: "https://www.youtube.com/watch?v=pJ2gxtrM7hM" },
        { name: "Remada Curvada com Halter", link: "https://www.youtube.com/watch?v=GZbfZ033f74" },
        { name: "Pull-Up Assistida", link: "https://www.youtube.com/watch?v=eGo4IYlbE5g" },
        { name: "Superman", link: "https://www.youtube.com/watch?v=z6PJMT2y8GQ" },
        { name: "Prancha com Remada", link: "https://www.youtube.com/watch?v=JrNij5T0sz0" },
        { name: "Pull-Up Tradicional", link: "https://www.youtube.com/watch?v=HRV5xW1c0Og" },
        { name: "Remada Unilateral", link: "https://www.youtube.com/watch?v=pYcpY20QaE8" },
        { name: "Extensão Lombar", link: "https://www.youtube.com/watch?v=ph3pK6nJGaw" },
        { name: "Remada Invertida", link: "https://www.youtube.com/watch?v=RDr4mj7S-70" },
        { name: "Pull-Up Explosiva", link: "https://www.youtube.com/watch?v=cD_7FjL-Jco" }
    ],
    "Pernas": [
        { name: "Agachamento Livre", link: "https://www.youtube.com/watch?v=aclHkVaku9U" },
        { name: "Agachamento Búlgaro", link: "https://www.youtube.com/watch?v=2C-uNgKwPLE" },
        { name: "Passada Alternada", link: "https://www.youtube.com/watch?v=wrwwXE_x-pQ" },
        { name: "Ponte de Glúteo", link: "https://www.youtube.com/watch?v=m2Zx-57cSok" },
        { name: "Panturrilha em Pé", link: "https://www.youtube.com/watch?v=-M4-G8p8fmc" },
        { name: "Agachamento Sumô", link: "https://www.youtube.com/watch?v=6xw1OAgXl9Q" },
        { name: "Step-Up", link: "https://www.youtube.com/watch?v=dQqApCGd5Ss" },
        { name: "Agachamento Isométrico", link: "https://www.youtube.com/watch?v=U3HlEF_E9fo" },
        { name: "Agachamento com Salto", link: "https://www.youtube.com/watch?v=U4s4mEQ5VqU" },
        { name: "Deadlift Romeno com Halteres", link: "https://www.youtube.com/watch?v=2SHsk9AzdjA" }
    ],
    "Ombros": [
        { name: "Elevação Lateral", link: "https://www.youtube.com/watch?v=3VcKaXpzqRo" },
        { name: "Elevação Frontal", link: "https://www.youtube.com/watch?v=-t7fuZ0KhDA" },
        { name: "Desenvolvimento com Halter Sentado", link: "https://www.youtube.com/watch?v=B-aVuyhvLHU" },
        { name: "Arnold Press", link: "https://www.youtube.com/watch?v=vj2w851ZHRM" },
        { name: "Remada Alta", link: "https://www.youtube.com/watch?v=GDYExb6ZzVY" },
        { name: "Face Pull", link: "https://www.youtube.com/watch?v=rep-qVOkqgk" },
        { name: "Elevação Posterior", link: "https://www.youtube.com/watch?v=O5c1EXoN8Zs" },
        { name: "Pike Push-Up", link: "https://www.youtube.com/watch?v=U0bhE67HuDY" },
        { name: "Handstand Hold", link: "https://www.youtube.com/watch?v=Q9jC1HjR8a4" },
        { name: "Encolhimento com Halter", link: "https://www.youtube.com/watch?v=5k1hff2a3Dc" }
    ],
    "Braços": [
        { name: "Rosca Direta", link: "https://www.youtube.com/watch?v=ykJmrZ5v0Oo" },
        { name: "Rosca Martelo", link: "https://www.youtube.com/watch?v=zC3nLlEvin4" },
        { name: "Tríceps Testa", link: "https://www.youtube.com/watch?v=d_KZxkY_0cM" },
        { name: "Mergulho entre Cadeiras", link: "https://www.youtube.com/watch?v=0326dy_-CzM" },
        { name: "Rosca Concentrada", link: "https://www.youtube.com/watch?v=soxrZlIl35U" },
        { name: "Tríceps Kickback", link: "https://www.youtube.com/watch?v=6SSoWbIqgT8" },
        { name: "Rosca Inversa", link: "https://www.youtube.com/watch?v=5vNL-_K2hcE" },
        { name: "Rosca Alternada", link: "https://www.youtube.com/watch?v=av7-8igSXTs" },
        { name: "Tríceps no Banco", link: "https://www.youtube.com/watch?v=3p8EBPVZ2Iw" },
        { name: "Flexão Diamante", link: "https://www.youtube.com/watch?v=J0DnG1_S92I" }
    ],
    "Core": [
        { name: "Prancha Tradicional", link: "https://www.youtube.com/watch?v=pSHjTRCQxIw" },
        { name: "Prancha Lateral", link: "https://www.youtube.com/watch?v=K2VljzCC16g" },
        { name: "Abdominal Bicicleta", link: "https://www.youtube.com/watch?v=9FGilxCbdz8" },
        { name: "Elevação de Pernas", link: "https://www.youtube.com/watch?v=JB2oyawG9KI" },
        { name: "Hollow Hold", link: "https://www.youtube.com/watch?v=spJH1pxtwz8" },
        { name: "Russian Twist", link: "https://www.youtube.com/watch?v=wkD8rjkodUI" },
        { name: "Mountain Climber", link: "https://www.youtube.com/watch?v=nmwgirgXLYM" },
        { name: "V-Up", link: "https://www.youtube.com/watch?v=iS8qUu4vK5M" },
        { name: "Sit-Up", link: "https://www.youtube.com/watch?v=1fbU_MkV7NE" },
        { name: "Prancha com Toque no Ombro", link: "https://www.youtube.com/watch?v=3rBl42Bvq0s" }
    ]
};

let currentFilter = 'All';
let selectedExercises = {};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calculator-form');
    const resultsDiv = document.getElementById('results');
    const filterButtonsContainer = document.getElementById('filter-buttons');
    const exerciseListContainer = document.getElementById('exercise-list');

    function calculateAndShowResults(e) {
        e.preventDefault();
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        const goal = document.getElementById('goal').value;

        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            resultsDiv.innerHTML = `<p class="text-red-400 md:col-span-3">Por favor, insira valores válidos para peso e altura.</p>`;
            return;
        }

        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
        const water = (weight * 35).toFixed(0);

        let proteinMultiplier;
        switch (goal) {
            case 'hypertrophy': proteinMultiplier = 2.0; break;
            case 'fat-loss': proteinMultiplier = 1.8; break;
            case 'recomposition': proteinMultiplier = 1.9; break;
            case 'running': proteinMultiplier = 1.6; break;
            default: proteinMultiplier = 1.8;
        }
        const protein = (weight * proteinMultiplier).toFixed(0);

        resultsDiv.innerHTML = `
            <div class="bg-gray-700 p-4 rounded-lg">
                <h3 class="text-lg font-bold text-orange-400">IMC</h3>
                <p class="text-2xl">${bmi}</p>
            </div>
            <div class="bg-gray-700 p-4 rounded-lg">
                <h3 class="text-lg font-bold text-orange-400">Água Diária</h3>
                <p class="text-2xl">${water} ml</p>
            </div>
            <div class="bg-gray-700 p-4 rounded-lg">
                <h3 class="text-lg font-bold text-orange-400">Proteína Diária</h3>
                <p class="text-2xl">${protein} g</p>
            </div>
        `;
    }

    function renderExercises(filter = 'All') {
        exerciseListContainer.innerHTML = '';
        const groupsToRender = filter === 'All' ? Object.keys(exercises) : [filter];
        
        groupsToRender.forEach(group => {
            if(filter === 'All') {
                 exerciseListContainer.innerHTML += `<h3 class="text-2xl font-bold text-orange-400 col-span-full mt-4">${group}</h3>`;
            }
            exercises[group].forEach(exercise => {
                const isSelected = selectedExercises[group] && selectedExercises[group].some(ex => ex.name === exercise.name);
                const card = `
                    <div class="exercise-card bg-gray-800 p-4 rounded-lg shadow-md flex flex-col justify-between" data-group="${group}" data-name="${exercise.name}">
                        <h4 class="font-bold text-lg mb-2">${exercise.name}</h4>
                        <div class="flex items-center justify-between mt-2">
                             <a href="${exercise.link}" target="_blank" rel="noopener noreferrer" class="text-orange-400 hover:text-orange-300">Ver Vídeo</a>
                             <button class="select-exercise-btn p-2 rounded-full transition-colors ${isSelected ? 'bg-orange-500' : 'bg-gray-600 hover:bg-gray-500'}">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${isSelected ? 'M5 13l4 4L19 7' : 'M12 4v16m8-8H4'}" />
                                </svg>
                             </button>
                        </div>
                    </div>
                `;
                exerciseListContainer.innerHTML += card;
            });
        });

        document.querySelectorAll('.select-exercise-btn').forEach(btn => {
            btn.addEventListener('click', toggleExerciseSelection);
        });
    }

    function toggleExerciseSelection(e) {
        const card = e.currentTarget.closest('.exercise-card');
        const group = card.dataset.group;
        const name = card.dataset.name;
        const link = exercises[group].find(ex => ex.name === name).link;

        if (!selectedExercises[group]) {
            selectedExercises[group] = [];
        }

        const exerciseIndex = selectedExercises[group].findIndex(ex => ex.name === name);
        if (exerciseIndex > -1) {
            selectedExercises[group].splice(exerciseIndex, 1);
            if (selectedExercises[group].length === 0) {
                delete selectedExercises[group];
            }
        } else {
            selectedExercises[group].push({ name, link });
        }
        
        updateExportButtonsVisibility();
        renderExercises(currentFilter);
    }

    function updateExportButtonsVisibility() {
        const exportButtons = document.getElementById('export-buttons');
        if (Object.keys(selectedExercises).length > 0) {
            exportButtons.classList.remove('hidden');
        } else {
            exportButtons.classList.add('hidden');
        }
    }

    function createFilterButtons() {
        const groups = ['All', ...Object.keys(exercises)];
        groups.forEach(group => {
            const btn = document.createElement('button');
            btn.textContent = group === 'All' ? 'Todos' : group;
            btn.className = `filter-btn px-4 py-2 rounded-lg transition-colors duration-300 ${group === 'All' ? 'active' : 'bg-gray-700 hover:bg-gray-600'}`;
            btn.dataset.filter = group;
            filterButtonsContainer.appendChild(btn);
        });

        filterButtonsContainer.addEventListener('click', e => {
            if (e.target.tagName === 'BUTTON') {
                currentFilter = e.target.dataset.filter;
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active', 'bg-orange-500', 'text-black'));
                e.target.classList.add('active');
                renderExercises(currentFilter);
            }
        });
    }

    function exportToCSV() {
        let data = [];
        for (const group in selectedExercises) {
            selectedExercises[group].forEach(ex => {
                data.push({ Grupo: group, Exercicio: ex.name, Link: ex.link });
            });
        }
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "minha_rotina_de_treino.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function exportToPDF() {
        const doc = new jsPDF();
        let y = 15;
        doc.setFontSize(20);
        doc.text("Minha Rotina de Treino", 105, y, null, null, "center");
        y += 15;

        for (const group in selectedExercises) {
            doc.setFontSize(16);
            doc.text(group, 14, y);
            y += 8;
            doc.setFontSize(12);
            selectedExercises[group].forEach(ex => {
                if (y > 280) { // New page
                    doc.addPage();
                    y = 15;
                }
                doc.text(`- ${ex.name}`, 20, y);
                y += 7;
            });
             y += 5;
        }
        doc.save("minha_rotina_de_treino.pdf");
    }

    form.addEventListener('submit', calculateAndShowResults);
    document.getElementById('export-csv').addEventListener('click', exportToCSV);
    document.getElementById('export-pdf').addEventListener('click', exportToPDF);
    createFilterButtons();
    renderExercises();
});

