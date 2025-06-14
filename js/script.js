// Complete solution to fix container sizing issues

// Store references to key elements
const layers = document.querySelectorAll('.layer');
const overlay = document.querySelector('.overlay');
const titleBlock = document.querySelector('.title-block');
const infoBlock = document.querySelector('.info-block');
const tourButton = document.getElementById('tour-button');
const container = document.querySelector('#container');
const background = document.querySelector('.background');
const homeButton = document.getElementById('home_btn');
const firstTourInfo = document.getElementById('first-tour-info');
const secondTourInfo = document.getElementById('second-tour-info');
const thirdTourInfo = document.getElementById('third-tour-info');
const infoText = document.getElementById('info-text');
const infoButtons = document.querySelectorAll('.info-btn');

// Add event listener to home button
if (homeButton) {
    homeButton.addEventListener('click', function () {
        window.location.href = 'index.html';
    });
}

let currentExpandedLayer = null;
let currentTour = null;

// This function adjusts the container to the exact size of the background image
function adjustContainerToBackground() {
    // Wait for the image to be fully loaded
    if (!background || !background.complete) return;

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
if (background) {
    background.addEventListener('load', adjustContainerToBackground);
    
    // Call it immediately if the image is already cached and loaded
    if (background.complete) {
        adjustContainerToBackground();
    }
}

// Re-adjust when window size changes
window.addEventListener('resize', adjustContainerToBackground);

// Tour data configuration
const tours = {
    '1': [
        { title: "Surrealistische Architektur", description: "Die Proportionen und Wände der ursprünglichen gotischen Hallenkirche wirken hier verzerrt und surreal. Wie wohl der Grundriss von dieses bizarren Baus aussehen würde?", zoom: { scale: 2, x: "0%", y: "0%" } },
        { title: "Rauchender Turm", description: "Was mag wohl im Turm im Hintergrund passieren? Als wir das Bild generierten, wurde der KI gesagt, dass ein Stadtbrand dargestellt werden soll - aber anscheinend hat sie noch nicht ganz verstanden wie Rauch entsteht...", zoom: { scale: 2.5, x: "-30%", y: "+15%" } },
        { title: "Mystische Kreatur", description: "Was für ein seltsames Tier hier neben den winzigen Pferden entstanden ist, wissen wir auch nicht... Vielleicht ist es eine ausgestorbene Art oder eine Phantasie-Kreatur die es nur im KI-Mittelalter gibt?", zoom: { scale: 1.8, x: "15%", y: "-25%" } }
    ],
    '2': [
        { title: "Unerschütterlich", description: "Trotz der Tatsache, dass diese Menschenmasse neben einem großen Feuerausbruch steht, scheint sie ziemlich entspannt zu sein...", zoom: { scale: 2.5, x: "-20%", y: "-18%" } },
        { title: "Geisterturm", description: "Hinter der Kreuzkirche schwebt ein gespenstischer Turm einer mysteriösen anderen Kirche... Was für ein gruseliges Ritual geht hier vor sich? Was denkt ihr?", zoom: { scale: 2.2, x: "-2%", y: "+13%" } }
    ],
    '3': [
        { title: "Seltsames Loch im Gebäude?", description: "Wie ist denn dieses komische Loch im Gebäude entstanden? Es sieht viel zu rund aus, um ein Kanoneneinschlag zu sein … Was denkt Ihr? Worauf könnte dieses architektonische Merkmal hindeuten?", zoom: { scale: 2.5, x: "-25%", y: "-8%" } },
        { title: "Kugelstoßen im Gefecht", description: "Dieser Soldat scheint mitten in der Schlacht Kugelstoßen zu spielen! Noch seltsamer: Ein Kamerad aus der eigenen Truppe scheint ihn von hinten zu bedrohen… was für eine merkwürdige Kampfstrategie!", zoom: { scale: 3, x: "-30%", y: "-20%" } }
    ],
    '5': [
        { title: "Ein Gewölbe?", description: "Hier sehen wir die Kreuzkirche mit einem Gewölbe auf ihrem Turm. Die KI verarbeitet das Wort „Dresden\" und fügt sofort auch in unpassenden Orten der Frauenkirche ähnliche Kuppeln hinzu …", zoom: { scale: 2, x: "0%", y: "18%" } },
        { title: "Gruselige Gestalten...", description: "Was sind diese gruseligen Figuren und was planen sie? Wir wissen es auch nicht...", zoom: { scale: 2.2, x: "-10%", y: "-30%" } }
    ]
};

// Layer-specific information texts for different categories
const layerInfoTexts = {
    '1': {
        ereignisse: "Am 15. Juni zerstörte ein Stadtbrand große Teile Dresdens, wovon auch die Kreuzkirche betroffen war. Gewölbe und Pfeiler des Langhauses stürzten ein. Andere Teile der Kirche blieben ganz oder teilweise erhalten und wurden beim erneuten Aufbau wiederverwendet.",
        zeitabschnitt: " dummy",
        folgen: " dummy"
    },
    '2': {
        ereignisse: "Im Jahr 1897 entwickelte sich vom hölzernen Dachstuhl der Kirche ausgehend ein verheerender Brand, bei dem der gesamte Innenraum vollständig ausbrannte. Nur die aus Sandstein gebauten Umfassungsmauern und der Turm hielten stand.",
        zeitabschnitt: "dummyyyyyyy",
        folgen: "Um 1900 wurde der von den Architekten Rudolf Schilling und Julius Graebner entworfene Innenraum neu eingeweiht."
    },
    '3': {
        ereignisse: "Im Jahr 1750 wurde die Kreuzkirche aufgrund ihrer Nähe zur Stadtmauer durch preußischen Artilleriebeschuss schwer beschädigt. Langhaus und Chor wurden beim Angriff zerstört.",
        zeitabschnitt: "Dresden wurde im Verlauf des Siebenjährigen Krieges vom 13. – 30. Juli 1760 von preußischen Truppen belagert, nachdem es im Sommer des Vorjahres von der Reichsarmee besetzt worden war. Die Belagerung blieb aber erfolglos.",
        folgen: "Im Jahr 1765 stürzte der bisher erhalten gebliebene Querwestturm ein. Die Wiederaufbauarbeiten haben bereits begonnen und erste Grundmauern des geplanten Neubaus wurden errichtet. Nach diesem Ereignis ist auch Bellottos Bild der Ruine entstanden."
    },
    '4': {
        ereignisse: "Bei den Luftangriffen am 13. und 14. Februar blieb die Kirche zwar von Bomben verschont, wurde aber von innen völlig ausgebrannt. Dabei verbrannte die Orgel vollständig. Ein  Altarbild von Anton Dietrich, das die Kreuzkirche zeigte, überstand das Feuer rußgeschwärzt und blieb erhalten.",
        zeitabschnitt: "Vom 13. bis zum 15. Februar erfolgten mehrere Luftangriffe auf Dresden. 22.000 –25.000 Menschen kamen dabei ums Leben. Die Altstadt brannte zu großen Teilen aus, wobei unter anderem die Semperoper, die Frauenkirche und der Zwinger zerstört wurden.",
        folgen: "Der Wiederaufbau des Innenraumes erfolgte ab Ende 1945 unter der Leitung des Architekten Fritz Steudtner. Sämtliche, vom Feuer angegriffenen Stuck- und Sandsteinpartien im Inneren ließ er abschlagen und durch schlichten Rauputz ersetzen. Diese provisorische, eher moderne Ausgestaltung der Kirche ist kontrovers, dennoch wurde sie bis heute in dieser Form erhalten. Das Kreuzigungsbild hängt nun über dem Altar."
    },
    '5': {
        ereignisse: "Im Jahr 1669 schlug ein Blitz in die Kirche ein und setzte den Westturm in Brand. Dieser wurde im Nachhinein originalgetreu rekonstruiert und galt fast 200 Jahre lang als Wahrzeichen der Stadt Dresden.",
        zeitabschnitt: "dummy.",
        folgen: "dummy"
    }
};

// Layer-specific titles
const layerTitles = {
    '1': "Findet ihr alle KI-Kuriositäten?",
    '2': "Findet ihr alle KI-Kuriositäten?",
    '3': "Findet ihr alle KI-Kuriositäten?",
    '4': "Findet ihr alle KI-Kuriositäten?",
    '5': "Findet ihr alle KI-Kuriositäten?",
};

// Layer headings - HIER SIND DIE ZEILENUMBRÜCHE!
const layerHeadings = {
    '1': "Stadtbrand (1491):",
    '2': "Brand der Kirche (1897):",
    '3': "Siebenjähriger Krieg<br>(1756 bis 1763):",
    '4': "Zweiter Weltkrieg<br>(1939 bis 1945):",
    '5': "Blitzeinschlag (1669):",
};

// Initialize UI elements
if (titleBlock) titleBlock.style.display = "none";
if (infoBlock) infoBlock.style.display = "none";
if (firstTourInfo) firstTourInfo.style.display = "none";
if (secondTourInfo) secondTourInfo.style.display = "none";
if (thirdTourInfo) thirdTourInfo.style.display = "none";

// Event handler for layer clicks
layers.forEach(layer => {
    layer.addEventListener('click', function (e) {
        if (e.target === this && !this.classList.contains('expanded')) {
            if (currentExpandedLayer) {
                closeExpanded();
            }

            currentExpandedLayer = this;
            const layerId = this.dataset.layer;

            if (background) background.classList.add('blurred');
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

            if (overlay) overlay.classList.add('active');

            // Update content based on layer ID
            updateLayerContent(layerId);

            // Show appropriate UI elements based on layer ID
            if (layerId === '4') {
                if (titleBlock) titleBlock.style.display = "none";
                if (infoBlock) {
                    infoBlock.style.display = "block";
                    setTimeout(() => {
                        infoBlock.classList.add('visible');
                    }, 10);
                }
            } else {
                if (titleBlock) {
                    titleBlock.style.display = "block";
                    setTimeout(() => {
                        titleBlock.classList.add('visible');
                    }, 10);
                }
                if (infoBlock) {
                    infoBlock.style.display = "block";
                    setTimeout(() => {
                        infoBlock.classList.add('visible');
                    }, 10);
                }

                // Show tour button only if tours exist for this layer
                if (tourButton && tours[layerId]) {
                    tourButton.style.display = "block";
                } else if (tourButton) {
                    tourButton.style.display = "none";
                }
            }
        }
    });
});

// Erweiterte updateLayerContent Funktion mit Button-Sichtbarkeit
function updateLayerContent(layerId) {
    // Update title block
    if (titleBlock) {
        const titleElement = titleBlock.querySelector('h2');
        if (titleElement && layerTitles[layerId]) {
            titleElement.innerHTML = layerTitles[layerId];
        }
    }

    // Update info block
    if (infoBlock) {
        const infoElement = infoBlock.querySelector('p');
        let headingElement = infoBlock.querySelector('h3');
        
        if (!headingElement) {
            headingElement = document.createElement('h3');
            infoBlock.insertBefore(headingElement, infoElement);
        }

        // HIER WIRD DER ZEILENUMBRUCH GESETZT!
        if (headingElement && layerHeadings[layerId]) {
            headingElement.innerHTML = layerHeadings[layerId];
        }

        // Button-Sichtbarkeit basierend auf Layer-ID
        const ereignisseBtn = document.querySelector('.info-btn[data-info="ereignisse"]');
        const zeitabschnittBtn = document.querySelector('.info-btn[data-info="zeitabschnitt"]');
        const folgenBtn = document.querySelector('.info-btn[data-info="folgen"]');
        
        // Verstecke alle Buttons zunächst
        if (ereignisseBtn) ereignisseBtn.style.display = 'none';
        if (zeitabschnittBtn) zeitabschnittBtn.style.display = 'none';
        if (folgenBtn) folgenBtn.style.display = 'none';
        
        let defaultCategory = 'ereignisse'; // Standard-Kategorie
        
        // Layer-spezifische Button-Sichtbarkeit
        switch(layerId) {
            case '1': // Layer 1: Keine Buttons
            case '5': // Layer 5: Keine Buttons
                // Alle Buttons bleiben versteckt
                break;
                
            case '2': // Layer 2: Nur Ereignisse und Folgen
                if (ereignisseBtn) ereignisseBtn.style.display = 'flex';
                if (folgenBtn) folgenBtn.style.display = 'flex';
                break;
                
            case '3': // Layer 3: Alle 3 Buttons
            case '4': // Layer 4: Alle 3 Buttons
                if (ereignisseBtn) ereignisseBtn.style.display = 'flex';
                if (zeitabschnittBtn) zeitabschnittBtn.style.display = 'flex';
                if (folgenBtn) folgenBtn.style.display = 'flex';
                break;
        }

        // Setze Standard-Text basierend auf verfügbaren Buttons
        if (infoElement && layerInfoTexts[layerId]) {
            // Für Layer 1 und 5: Verwende immer "ereignisse" als Text
            if (layerId === '1' || layerId === '5') {
                defaultCategory = 'ereignisse';
            }
            
            if (layerInfoTexts[layerId][defaultCategory]) {
                infoElement.textContent = layerInfoTexts[layerId][defaultCategory];
            }
        }
    }

    // Setze die Info-Buttons zurück (nur für sichtbare Buttons)
    resetInfoButtons();
}

// Tour button click handler
if (tourButton) {
    tourButton.addEventListener('click', () => {
        if (currentExpandedLayer) {
            const layerId = currentExpandedLayer.dataset.layer;
            if (tours[layerId]) {
                currentTour = { layerId: layerId, currentStep: 0 };
                startTourStep();
            }
        }
    });
}

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
        if (titleBlock) titleBlock.classList.remove('visible');
        if (infoBlock) infoBlock.classList.remove('visible');

        // Update and show tour information
        if (firstTourInfo) {
            firstTourInfo.querySelector('h3').textContent = step.title;
            firstTourInfo.querySelector('p').textContent = step.description;
        }

        const nextButton = document.getElementById('next-button');
        if (nextButton) {
            nextButton.textContent = currentTour.currentStep === tour.length - 1 ?
                "Tour beenden" : "Weiter geht's!";

            // Update button click handlers
            if (currentTour.currentStep === tour.length - 1) {
                nextButton.onclick = endTour;
            } else {
                nextButton.onclick = nextTourStep;
            }
        }

        setTimeout(() => {
            if (firstTourInfo) {
                firstTourInfo.style.display = "block";
                setTimeout(() => {
                    firstTourInfo.classList.add('visible');
                }, 10);
            }
            if (secondTourInfo) secondTourInfo.style.display = "none";
            if (thirdTourInfo) thirdTourInfo.style.display = "none";
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
    if (firstTourInfo) firstTourInfo.classList.remove('visible');
    if (secondTourInfo) secondTourInfo.classList.remove('visible');
    if (thirdTourInfo) thirdTourInfo.classList.remove('visible');

    setTimeout(() => {
        if (firstTourInfo) firstTourInfo.style.display = "none";
        if (secondTourInfo) secondTourInfo.style.display = "none";
        if (thirdTourInfo) thirdTourInfo.style.display = "none";

        // Show title and info blocks after tour ends
        setTimeout(() => {
            if (titleBlock) titleBlock.classList.add('visible');
            if (infoBlock) infoBlock.classList.add('visible');
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
        if (titleBlock) titleBlock.classList.remove('visible');
        if (infoBlock) infoBlock.classList.remove('visible');

        document.querySelectorAll('.tour-info').forEach(info => {
            info.classList.remove('visible');
        });

        if (background) background.classList.remove('blurred');
        layers.forEach(layer => {
            layer.classList.remove('hidden');
        });

        if (overlay) overlay.classList.remove('active');

        setTimeout(() => {
            expandedContainer.remove();
            // Reset display for all info elements
            if (titleBlock) titleBlock.style.display = "none";
            if (infoBlock) infoBlock.style.display = "none";

            document.querySelectorAll('.tour-info').forEach(info => {
                info.style.display = "none";
            });

            currentExpandedLayer = null;
            currentTour = null;
        }, 300);
    }
}

// Add click handler to overlay
if (overlay) {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeExpanded();
        }
    });
}

// Configure additional tour navigation buttons
const toThirdButton = document.getElementById('to-third-button');
if (toThirdButton) {
    toThirdButton.addEventListener('click', function () {
        if (secondTourInfo) {
            secondTourInfo.classList.remove('visible');
            setTimeout(() => {
                secondTourInfo.style.display = "none";
                if (thirdTourInfo) {
                    thirdTourInfo.style.display = "block";
                    setTimeout(() => {
                        thirdTourInfo.classList.add('visible');
                    }, 10);
                }
            }, 300);
        }
    });
}

const backToFirstButton = document.getElementById('back-to-first-button');
if (backToFirstButton) {
    backToFirstButton.addEventListener('click', function () {
        if (secondTourInfo) {
            secondTourInfo.classList.remove('visible');
            setTimeout(() => {
                secondTourInfo.style.display = "none";
                if (firstTourInfo) {
                    firstTourInfo.style.display = "block";
                    setTimeout(() => {
                        firstTourInfo.classList.add('visible');
                    }, 10);
                }
            }, 300);
        }
    });
}

const backToSecondButton = document.getElementById('back-to-second-button');
if (backToSecondButton) {
    backToSecondButton.addEventListener('click', function () {
        if (thirdTourInfo) {
            thirdTourInfo.classList.remove('visible');
            setTimeout(() => {
                thirdTourInfo.style.display = "none";
                if (secondTourInfo) {
                    secondTourInfo.style.display = "block";
                    setTimeout(() => {
                        secondTourInfo.classList.add('visible');
                    }, 10);
                }
            }, 300);
        }
    });
}

const endTourButton = document.getElementById('end-tour-button');
if (endTourButton) {
    endTourButton.addEventListener('click', endTour);
}

// Event-Listener für die Info-Buttons (Ereignisse, Zeitabschnitt, Folgen)
infoButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Entferne 'active' Klasse von allen Buttons
        infoButtons.forEach(btn => btn.classList.remove('active'));
        
        // Füge 'active' Klasse zum geklickten Button hinzu
        this.classList.add('active');
        
        // Hole die Kategorie aus dem data-info Attribut
        const category = this.dataset.info;
        
        // Hole die aktuelle Layer-ID
        if (currentExpandedLayer) {
            const layerId = currentExpandedLayer.dataset.layer;
            
            // Update den Info-Text basierend auf der Kategorie und Layer-ID
            if (layerInfoTexts[layerId] && layerInfoTexts[layerId][category]) {
                if (infoText) {
                    infoText.textContent = layerInfoTexts[layerId][category];
                }
            }
        }
    });
});

// Erweiterte resetInfoButtons Funktion
function resetInfoButtons() {
    // Entferne active Klasse von allen Buttons
    infoButtons.forEach(btn => btn.classList.remove('active'));
    
    // Finde den ersten sichtbaren Button und setze ihn als aktiv
    const visibleButtons = Array.from(infoButtons).filter(btn => 
        btn.style.display !== 'none' && btn.offsetParent !== null
    );
    
    if (visibleButtons.length > 0) {
        visibleButtons[0].classList.add('active');
    } else {
        // Fallback: Setze den "Ereignisse" Button als aktiv, falls vorhanden
        const ereignisseBtn = document.querySelector('.info-btn[data-info="ereignisse"]');
        if (ereignisseBtn) {
            ereignisseBtn.classList.add('active');
        }
    }
}

// Initialize the page by adjusting container size
adjustContainerToBackground();
