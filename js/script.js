// Complete solution to fix container sizing issues

// Store references to key elements
const layers = document.querySelectorAll('.layer');
const overlay = document.querySelector('.overlay');
const titleBlock = document.querySelector('.title-block');
const infoBlock = document.querySelector('.info-block');
const tourButton = document.getElementById('tour-button');
const container = document.querySelector('#container');
const background = document.querySelector('.background');
const homeButton = document.getElementById('home-button');
const firstTourInfo = document.getElementById('first-tour-info');
const secondTourInfo = document.getElementById('second-tour-info');
const thirdTourInfo = document.getElementById('third-tour-info');

// Add event listener to home button
homeButton.addEventListener('click', function() {
    window.location.href = 'index.html';
});

let currentExpandedLayer = null;
let currentTour = null;

// This function adjusts the container to the exact size of the background image
function adjustContainerToBackground() {
    // Wait for the image to be fully loaded
    if (!background.complete) return;
    
    // Get the natural dimensions of the background image
    const bgWidth = background.naturalWidth;
    const bgHeight = background.naturalHeight;
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth - 40; // Subtract padding
    const viewportHeight = window.innerHeight - 40; // Subtract padding
    
    // Calculate appropriate scaling to fit the viewport while maintaining aspect ratio
    let scale = Math.min(viewportWidth / bgWidth, viewportHeight / bgHeight);
    
    // Set container dimensions to exactly match the scaled background image
    const scaledWidth = bgWidth * scale;
    const scaledHeight = bgHeight * scale;
    
    container.style.width = `${scaledWidth}px`;
    container.style.height = `${scaledHeight}px`;
    
    // Make sure the container doesn't overflow the viewport
    container.style.maxWidth = '100%';
    container.style.maxHeight = '100vh';
    
    // Position layers properly inside the container
    layers.forEach(layer => {
        layer.style.maxWidth = '100%';
        layer.style.maxHeight = '100%';
    });
}

// Call the adjustment function whenever the background image loads
background.addEventListener('load', adjustContainerToBackground);

// Call it immediately if the image is already cached and loaded
if (background.complete) {
    adjustContainerToBackground();
}

// Re-adjust when window size changes
window.addEventListener('resize', adjustContainerToBackground);

// Tour data configuration
const tours = {
    '1': [
        { title: "Surrealistische Architektur", description: "Die Proportionen und Wände der ursprünglich gotischen Hallenkirche wirken hier verzerrt und surreal. Wie wohl der Grundriss von dieser bizarren Kirche aussehen würde?", zoom: { scale: 2, x: "0%", y: "0%" } },
        { title: "Rauchender Turm", description: "Was mag wohl im Turm im Hintergrund passieren? Als wir das Bild generierten, wurde der KI gesagt, dass ein Stadtbrand dargestellt werden soll - aber anscheinend hat sie noch nicht ganz verstanden wie Rauch entsteht", zoom: { scale: 2.5, x: "-30%", y: "+15%" } },
        { title: "Mystische Kreatur", description: "Was für ein seltsames Tier hier neben den winzigen Pferden entstanden ist, wissen wir auch nicht... Vielleicht ist es eine ausgestorbene Art oder eine Phantasie-Kreatur die es nur im KI-Mittelalter gibt?", zoom: { scale: 1.8, x: "15%", y: "-25%" } }
    ],
    '2': [
        { title: "Unerschütterlich", description: "Trotz der Tatsache, dass diese Menschenmasse neben einem großen Feuerausbruch steht, scheint sie ziemlich entspannt zu sein...", zoom: { scale: 2.5, x: "-20%", y: "-18%" } },
        { title: "Geisterturm", description: "Hinter der Kreuzkirche schwebt ein gespenstischer Turm einer mysteriösen anderen Kirche... Was für ein gruseliges Ritual geht hier vor sich? Was denkt ihr?", zoom: { scale: 2, x: "0%", y: "+8%" } }
    ],
    '3': [
        { title: "Seltsames Loch im Gebäude?", description: "Wie ist denn dieses komische Loch im Gebäude entstanden? Es sieht viel zu rund aus um ein Kanoneneinschlag zu sein... Wofür denkt ihr könnte dieses architektonische Merkmal sein?", zoom: { scale: 2.5, x: "-25%", y: "-8%" } },
        { title: "Kugelstoßen im Gefecht", description: "Dieser Soldat scheint mitten in der Schlacht Kugelstoßen zu spielen! Noch seltsamer: Ein Kamerad aus der eigenen Truppe scheint ihn von hinten zu bedrohen… was für eine merkwürdige Kampfstrategie!", zoom: { scale: 3, x: "-30%", y: "-20%" } }
    ],
    '5': [
        { title: "Ein Gewölbe?", description: "Hier sehen wir die Kreuzkirche mit einem Gewölbe auf ihrem Turm. Die KI verarbeitet das Wort Dresden und fügt sofort in komischen Orten Frauenkirche-ähnliche Gewölbe hinzu....", zoom: { scale: 2, x: "5%", y: "18%" } },
        { title: "Gruselige Gestalten...", description: "Was sind diese gruseligen Figuren und was planen sie? Wir wissen es auch nicht...", zoom: { scale: 2.2, x: "-10%", y: "-30%" } }
    ]
};

// Initialize UI elements
titleBlock.style.display = "none";
infoBlock.style.display = "none";
firstTourInfo.style.display = "none";
secondTourInfo.style.display = "none";
thirdTourInfo.style.display = "none";

// Event handler for layer clicks
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
            
            // Clone the layer and prepare it for expansion
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
            clonedLayer.style.borderRadius = '15px';
            
            // Store original dimensions for zooming
            clonedLayer.setAttribute('data-original-width', this.naturalWidth);
            clonedLayer.setAttribute('data-original-height', this.naturalHeight);

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
            
            // Show appropriate UI elements based on layer ID
            if (layerId === '4') {
                titleBlock.style.display = "none";
                infoBlock.style.display = "block";
                
                setTimeout(() => {
                    infoBlock.classList.add('visible');
                }, 10);
            } else {
                titleBlock.style.display = "block";
                infoBlock.style.display = "block";
                
                setTimeout(() => {
                    titleBlock.classList.add('visible');
                    infoBlock.classList.add('visible');
                    
                    // Show tour button only if tours exist for this layer
                    if (tours[layerId]) {
                        tourButton.style.display = "block";
                    } else {
                        tourButton.style.display = "none";
                    }
                }, 10);
            }
        }
    });
});

// Tour button click handler
tourButton.addEventListener('click', () => {
    if (currentExpandedLayer) {
        const layerId = currentExpandedLayer.dataset.layer;
        if (tours[layerId]) {
            currentTour = { layerId: layerId, currentStep: 0 };
            startTourStep();
        }
    }
});

// Start a tour step
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

        // Preserve original dimensions during zoom
        expandedImage.style.width = 'auto';
        expandedImage.style.height = 'auto';
        
        expandedImage.classList.remove('zooming');
        void expandedImage.offsetWidth; // Force reflow
        expandedImage.classList.add('zooming');

        // Hide information blocks during tour
        titleBlock.classList.remove('visible');
        infoBlock.classList.remove('visible');

        // Update and show tour information
        firstTourInfo.querySelector('h3').textContent = step.title;
        firstTourInfo.querySelector('p').textContent = step.description;

        const nextButton = document.getElementById('next-button');
        nextButton.textContent = currentTour.currentStep === tour.length - 1 ? 
            "Tour beenden" : "Weiter geht's!";
        
        // Update button click handlers
        if (currentTour.currentStep === tour.length - 1) {
            nextButton.onclick = endTour;
        } else {
            nextButton.onclick = nextTourStep;
        }

        setTimeout(() => {
            firstTourInfo.style.display = "block";
            secondTourInfo.style.display = "none";
            thirdTourInfo.style.display = "none";
            
            setTimeout(() => {
                firstTourInfo.classList.add('visible');
            }, 10);
        }, 100);
    }
}

// Move to next tour step
function nextTourStep() {
    currentTour.currentStep++;
    startTourStep();
}

// End the tour and return to normal view
function endTour() {
    const expandedImage = document.querySelector('.layer.expanded');
    if (expandedImage) {
        expandedImage.style.setProperty('--from-scale', expandedImage.style.getPropertyValue('--to-scale') || '1');
        expandedImage.style.setProperty('--from-x', expandedImage.style.getPropertyValue('--to-x') || '0%');
        expandedImage.style.setProperty('--from-y', expandedImage.style.getPropertyValue('--to-y') || '0%');
        expandedImage.style.setProperty('--to-scale', '1');
        expandedImage.style.setProperty('--to-x', '0%');
        expandedImage.style.setProperty('--to-y', '0%');
        
        // Reset width and height
        expandedImage.style.width = 'auto';
        expandedImage.style.height = 'auto';

        expandedImage.classList.remove('zooming');
        void expandedImage.offsetWidth; // Force reflow
        expandedImage.classList.add('zooming');
    }

    // Hide tour info and show title/info blocks
    firstTourInfo.classList.remove('visible');
    secondTourInfo.classList.remove('visible');
    thirdTourInfo.classList.remove('visible');
    
    setTimeout(() => {
        firstTourInfo.style.display = "none";
        secondTourInfo.style.display = "none";
        thirdTourInfo.style.display = "none";
        
        // Show title and info blocks after tour ends
        setTimeout(() => {
            titleBlock.classList.add('visible');
            infoBlock.classList.add('visible');
        }, 100);
    }, 500);
}

// Close expanded view
function closeExpanded() {
    const expandedContainer = document.querySelector('.expanded-container');
    if (expandedContainer) {
        const expandedImage = document.querySelector('.layer.expanded');
        if (expandedImage) {
            expandedImage.style.animation = 'shrinkOut 0.3s ease-in forwards';
        }

        // Hide all information elements
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
            // Reset display for all info elements
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

// Add click handler to overlay
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        closeExpanded();
    }
});

// Configure additional tour navigation buttons
document.getElementById('to-third-button').addEventListener('click', function() {
    secondTourInfo.classList.remove('visible');
    setTimeout(() => {
        secondTourInfo.style.display = "none";
        thirdTourInfo.style.display = "block";
        setTimeout(() => {
            thirdTourInfo.classList.add('visible');
        }, 10);
    }, 300);
});

document.getElementById('back-to-first-button').addEventListener('click', function() {
    secondTourInfo.classList.remove('visible');
    setTimeout(() => {
        secondTourInfo.style.display = "none";
        firstTourInfo.style.display = "block";
        setTimeout(() => {
            firstTourInfo.classList.add('visible');
        }, 10);
    }, 300);
});

document.getElementById('back-to-second-button').addEventListener('click', function() {
    thirdTourInfo.classList.remove('visible');
    setTimeout(() => {
        thirdTourInfo.style.display = "none";
        secondTourInfo.style.display = "block";
        setTimeout(() => {
            secondTourInfo.classList.add('visible');
        }, 10);
    }, 300);
});

document.getElementById('end-tour-button').addEventListener('click', endTour);

// Initialize the page by adjusting container size
adjustContainerToBackground();