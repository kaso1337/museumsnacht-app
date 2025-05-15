const layers = document.querySelectorAll('.layer');
const overlay = document.querySelector('.overlay');
const titleBlock = document.querySelector('.title-block');
const infoBlock = document.querySelector('.info-block');
const tourButton = document.getElementById('tour-button');
const container = document.querySelector('#container');
const background = document.querySelector('.background');

let currentExpandedLayer = null;
let currentTour = null;
let backgroundSize = { width: 0, height: 0 };

function positionLayersInsideBackground() {
    const bgRect = background.getBoundingClientRect();
    
    layers.forEach(layer => {
        layer.style.maxWidth = `${bgRect.width}px`;
        layer.style.maxHeight = `${bgRect.height}px`;
    });
}

background.addEventListener('load', function() {
    backgroundSize.width = this.naturalWidth;
    backgroundSize.height = this.naturalHeight;
    
    setTimeout(positionLayersInsideBackground, 0);
});

if (background.complete) {
    backgroundSize.width = background.naturalWidth;
    backgroundSize.height = background.naturalHeight;
    setTimeout(positionLayersInsideBackground, 0);
}

window.addEventListener('resize', positionLayersInsideBackground);

const tours = {
    '1': [
        { title: "Surrealistische Architektur", description: "Die Proportionen und Wände der ursprünglich gotischen Hallenkirche wirken hier verzerrt und surreal. Wie wohl der Grundriss von dieser bizarren Kirche aussehen würde?", zoom: { scale: 2, x: "0%", y: "0%" } },
        { title: "Rauchender Turm", description: "Was mag wohl im Turm im Hintergrund passieren? Als wir das Bild generierten, wurde der KI gesagt, dass ein Stadtbrand dargestellt werden soll. - aber anscheindend hat sie noch nicht ganz verstanden wie Rauch entsteht", zoom: { scale: 2.5, x: "-30%", y: "+15%" } },
        { title: "Mystische Kreatur", description: "Was für ein seltsames  Tier hier neben den winzigen Pferden entstanden ist, wissen wir auch nicht... Vielleicht ist es eine ausgestorbene Art oder eine Phantasie-Kreatur die es nur im KI-Mittelalter gibt?", zoom: { scale: 1.8, x: "15%", y: "-25%" } }
    ],
    '2': [
        { title: "Unerschütterlich", description: "Trotz der  Tastache, dass diese Menschenmasse neben einem großen Feuerausbruch steht, scheint sie ziemlich entspannt zu sein...", zoom: { scale: 2.5, x: "-20%", y: "-18%" } },
        { title: "Geisterturm", description: "Hinter der Kreuzkirche schwebt ein gespenstischer  Turm einer mysteriösen anderen Kirche... Was für ein gruseliges Ritual geht hier vor sich?  Was denkt ihr?", zoom: { scale: 2, x: "0%", y: "+8%" } }
    ],
    '3': [
        { title: "Seltsames Loch im Gebäude ?", description: "Wie ist denn dieses komische Loch im Gebäude entstanden? Es sieht viel zu rund aus um ein Kanoneneinschlag zu sein... Wofür denkt ihr könnte dieses architektonische Merkmal sein?", zoom: { scale: 2.5, x: "-25%", y: "-8%" } },
        { title: "Kugelstoßen im Gefecht", description: "Dieser Soldat scheint mitten in der Schlacht Kugelstoßen zu spielen! Noch seltsamer: Ein Kamerad aus der eigenen Truppe scheint ihn von hinten zu bedrohen … was für eine merkwürdige Kampfstrategie!", zoom: { scale: 3, x: "-30%", y: "-20%" } }
    ],
    '5': [
        { title: "Ein Gewölbe?", description: "Hier sehen wir die Kreuzkirche mit einem Gewölbe auf ihrem  Turm. Die KI verarbeitet das Wort Dresden und fügt sofort in komischen Orten Fraunkirche-ähnliche Gewölbe hinzu....", zoom: { scale: 2, x: "5%", y: "18%" } },
        { title: "Gruselige Gestalten...", description: "Was sind diese gruseligen Figuren und was planen sie? Wir wissen es auch nicht...", zoom: { scale: 2.2, x: "-10%", y: "-30%" } }
    ]
};

titleBlock.style.display = "none";
infoBlock.style.display = "none";
document.getElementById('first-tour-info').style.display = "none";
document.getElementById('second-tour-info').style.display = "none";
document.getElementById('third-tour-info').style.display = "none";

layers.forEach(layer => {
    layer.addEventListener('click', function(e) {
        if (e.target === this && !this.classList.contains('expanded')) {
            if (currentExpandedLayer) {
                closeExpanded();
            }

            currentExpandedLayer = this;
            const layerId = this.dataset.layer;

            background.classList.add('blurred');
            layers.forEach(l => {
                if (l !== this) l.classList.add('hidden');
            });

            const expandedContainer = document.createElement('div');
            expandedContainer.className = 'expanded-container';

            const clonedLayer = this.cloneNode();
            clonedLayer.classList.add('expanded');
            
            clonedLayer.style.clipPath = 'none';
            
            clonedLayer.style.position = 'absolute';
            clonedLayer.style.top = '50%';
            clonedLayer.style.left = '50%';
            clonedLayer.style.transform = 'translate(-50%, -50%)';
            clonedLayer.style.maxWidth = '100%';
            clonedLayer.style.maxHeight = '100%';
            clonedLayer.style.width = 'auto';
            clonedLayer.style.height = 'auto';
            clonedLayer.style.objectFit = 'contain';
            clonedLayer.style.backgroundColor = 'transparent';

            expandedContainer.style.backgroundColor = 'transparent';

            const closeButton = document.createElement('div');
            closeButton.className = 'close-button';
            closeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                closeExpanded();
            });

            expandedContainer.appendChild(clonedLayer);
            expandedContainer.appendChild(closeButton);
            container.appendChild(expandedContainer);

            overlay.classList.add('active');
            titleBlock.style.display = "block";
            infoBlock.style.display = "block";

            setTimeout(() => {
                titleBlock.classList.add('visible');
                infoBlock.classList.add('visible');

                if (tours[layerId]) {
                    tourButton.style.display = "block";
                } else {
                    tourButton.style.display = "none";
                }
            }, 10);
        }
    });
});

tourButton.addEventListener('click', () => {
    if (currentExpandedLayer) {
        const layerId = currentExpandedLayer.dataset.layer;
        if (tours[layerId]) {
            currentTour = { layerId: layerId, currentStep: 0 };
            startTourStep();
        }
    }
});

function startTourStep() {
    const tour = tours[currentTour.layerId];
    const step = tour[currentTour.currentStep];
    const expandedImage = document.querySelector('.layer.expanded');

    if (expandedImage) {
        let fromScale = 1;
        let fromX = "0%";
        let fromY = "0%";

        if (currentTour.currentStep > 0) {
            const prevStep = tour[currentTour.currentStep - 1];
            fromScale = prevStep.zoom.scale;
            fromX = prevStep.zoom.x;
            fromY = prevStep.zoom.y;
        }

        expandedImage.style.setProperty('--from-scale', fromScale);
        expandedImage.style.setProperty('--from-x', fromX);
        expandedImage.style.setProperty('--from-y', fromY);
        expandedImage.style.setProperty('--to-scale', step.zoom.scale);
        expandedImage.style.setProperty('--to-x', step.zoom.x);
        expandedImage.style.setProperty('--to-y', step.zoom.y);

        expandedImage.classList.remove('zooming');
        void expandedImage.offsetWidth;
        expandedImage.classList.add('zooming');

        titleBlock.classList.remove('visible');
        infoBlock.classList.remove('visible');

        const tourInfo = document.getElementById('first-tour-info');
        tourInfo.querySelector('h3').textContent = step.title;
        tourInfo.querySelector('p').textContent = step.description;

        const nextButton = tourInfo.querySelector('button');
        nextButton.textContent = currentTour.currentStep === tour.length - 1 ? 
            "Tour beenden" : "Weiter geht's!";
        nextButton.onclick = currentTour.currentStep === tour.length - 1 ? 
            endTour : nextTourStep;

        setTimeout(() => {
            tourInfo.style.display = "block";
            setTimeout(() => {
                tourInfo.classList.add('visible');
            }, 10);
        }, 100);
    }
}

function nextTourStep() {
    currentTour.currentStep++;
    startTourStep();
}

function endTour() {
    const expandedImage = document.querySelector('.layer.expanded');
    if (expandedImage) {
        const currentTransform = window.getComputedStyle(expandedImage).transform;
        expandedImage.style.setProperty('--from-scale', currentTransform.includes('matrix') ? 
            parseFloat(currentTransform.split(',')[0].split('(')[1]) : 1);
        expandedImage.style.setProperty('--from-x', '0%');
        expandedImage.style.setProperty('--from-y', '0%');
        expandedImage.style.setProperty('--to-scale', 1);
        expandedImage.style.setProperty('--to-x', '0%');
        expandedImage.style.setProperty('--to-y', '0%');

        expandedImage.classList.remove('zooming');
        void expandedImage.offsetWidth;
        expandedImage.classList.add('zooming');
    }

    const tourInfo = document.getElementById('first-tour-info');
    tourInfo.classList.remove('visible');
    setTimeout(() => {
        tourInfo.style.display = "none";
    }, 500);

    setTimeout(() => {
        titleBlock.classList.add('visible');
        infoBlock.classList.add('visible');
    }, 500);
}

function closeExpanded() {
    const expandedContainer = document.querySelector('.expanded-container');
    if (expandedContainer) {
        const expandedImage = document.querySelector('.layer.expanded');
        if (expandedImage) {
            expandedImage.style.animation = 'shrinkOut 0.3s ease-in forwards';
        }

        titleBlock.classList.remove('visible');
        infoBlock.classList.remove('visible');
        document.querySelectorAll('.tour-info').forEach(info => {
            info.classList.remove('visible');
        });

        background.classList.remove('blurred');
        layers.forEach(layer => {
            layer.classList.remove('hidden');
        });

        overlay.classList.remove('active');

        setTimeout(() => {
            expandedContainer.remove();
            titleBlock.style.display = "none";
            infoBlock.style.display = "none";
            document.querySelectorAll('.tour-info').forEach(info => {
                info.style.display = "none";
            });
            currentExpandedLayer = null;
            currentTour = null;
        }, 300);
    }
}

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        closeExpanded();
    }
});

function injectKeyframes() {
    const style = document.createElement('style');
    style.id = 'dynamic-keyframes';

    let keyframesCSS = '';

    Object.entries(tours).forEach(([layerId, steps]) => {
        steps.forEach((step, index) => {
            keyframesCSS += `
                @keyframes zoomStep${index + 1} {
                    0% { transform: scale(1) translateX(0) translateY(0); }
                    100% { transform: scale(${step.zoom.scale}) translateX(${step.zoom.x}) translateY(${step.zoom.y}); }
                }
            `;
        });
    });

    style.textContent = keyframesCSS;
    document.head.appendChild(style);
}

injectKeyframes();
