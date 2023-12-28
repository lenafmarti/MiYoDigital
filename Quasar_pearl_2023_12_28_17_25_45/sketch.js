let displayedText = "";
let rotationX = 0;
let rotationY = 0;
let folders = [];
let years = 0;
let publicationsPerYear = [1,3 ,5,7,3,9,10,15,30, 40,50,60,70,100,100,100,100,100,100,100 ];
let totalPublications = 0;
let currentPublications = 1;
let input, button, greeting;

// Array de textos que se mostrarán al hacer clic
let texts = [
  '0   Emmagatzematge de dades (GB)\n0   Nombre d’interaccions digitals\n0   Dispositius utilitzats\n1   Plataformes registrades',
  '1   Emmagatzematge de dades (GB)\n0   Nombre d’interaccions digitals\n0   Dispositius utilitzats\n2   Plataformes registrades',
  '3   Emmagatzematge de dades (GB)\n0   Nombre d’interaccions digitals\n0   Dispositius utilitzats\n3   Plataformes registrades',
  '7   Emmagatzematge de dades (GB)\n10  Nombre d’interaccions digitals\n2   Dispositius utilitzats\n4   Plataformes registrades',
  '10  Emmagatzematge de dades (GB)\n15  Nombre d’interaccions digitals\n3   Dispositius utilitzats\n5   Plataformes registrades',
  '0   Emmagatzematge de dades (GB)\n0   Nombre d’interaccions digitals\n0   Dispositius utilitzats\n1   Plataformes registrades',
  '0   Emmagatzematge de dades (GB)\n0   Nombre d’interaccions digitals\n0   Dispositius utilitzats\n1   Plataformes registrades',
  '1 picture',
  '255 pictures\n234 likes\n2344 comments',
  '287 pictures\n765 likes\n2344 comments',
  // Agrega más textos según sea necesario
];



// Variable para rastrear el índice actual del array de textos
let currentTextIndex = 0;

let text_folder = [
  'REGISTRE MÈDIC',
  'CÀMERA DIGITAL',
 
];

let text_folder_1 = [
  'REGISTRE MÈDIC',
  'CÀMERA DIGITAL',
  'WII',
  'CD',
  'PSP',
  'CLUB PENGUIN',
  'IPOD', 
  'CLUB SUPER3',
  'GOOGLE',
  'ITUNES',
  'YOUTUBE',
  // Add more platform texts as needed
];


// Platform texts for the years after the first five years
let text_folder_2 = [
  'GOOGLE',
  'ITUNES',
  'YOUTUBE',
  'BOOKSY',
  'ARE',
  'MORAVIA',
  'MAXIMUMSCAPE',
  'SUSTENAINABLE BRANDS',
  'TWITTER',
  'GMAIL',
  'INSTAGRAM',
  'FACEBOOK',
  'WHATSAPP',
  'PINTEREST',
  'TWITTER',
  // Add more platform texts as needed
];


// Variable to hold the current platform text array
let currentTextFolders = text_folder;

var myFont;

function preload() {
  myFont = loadFont('Inconsolata-Regular.ttf');
}



function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  for (let i = 0; i < publicationsPerYear.length; i++) {
    totalPublications=totalPublications+publicationsPerYear[i];
  }
  // Crear un arreglo de carpetas en una línea diagonal (hacia el otro lado)
  for (let i = 0; i < totalPublications; i++) {

    
    let folder = {
      x: random(-width/2, width/2),
      y: random(-height/2, height/2),
     // z: random(-height/2, 300),
      z: (-20),

       R: 0,
       G: 0,
       B: 255,

  hovered: false,
  alreadyHovered: false, // Add this property
      folder_txt: currentTextFolders[Math.floor(random(0, currentTextFolders.length))],
      jumpHeight: 0,
      isOpen: false,
    };    

    folders.push(folder);
    

  }
}

function getRandomText(textArray) {
  return textArray[Math.floor(random(0, textArray.length))];
}


function mouseClicked() {
  currentPublications = currentPublications +publicationsPerYear[years];
  years=years+1;
  
    // Change the platform text array after the first five years
  if (years > 2) {
    currentTextFolders = text_folder_1;
  }
  
   if (years > 8) {
    currentTextFolders = text_folder_2;
  }

  // Update the text for each folder
  for (let folder of folders) {
    folder.folder_txt = getRandomText(currentTextFolders);
  }
  

  // Cambiar el texto al siguiente en el array
  currentTextIndex = (currentTextIndex + 1) % texts.length;

}


  function draw() {
  background(0);

  // Etiquetas
  push();
  textFont(myFont);
  fill(255,255,255);
  textSize(100);
  textAlign(CENTER);
  translate(0, 0, 320);
  text(years + 2003, 0, 0);
  pop();

  push();
  textFont(myFont);
  fill('rgb(255,255,255)');
  textSize(9);
  textAlign(LEFT);
  translate(-75, -10, 320);
 text(texts[currentTextIndex], 0, 40);
  pop();
  




  camera(0, 0, (height / 2) / tan(PI / 6), 0, 0, 0, 0, 1, 0);

  for (let i = 0; i < currentPublications; i++) {
    if (i < folders.length) {
      let folder = folders[i];

      // Verificar si el ratón está sobre la carpeta
      let distance = dist(mouseX, mouseY, folder.x + width / 2, folder.y + height / 2);
      if (distance < 20) {
        folder.hovered = true;
      } else {
        folder.hovered = false;
      }

      push();
      translate(folder.x, folder.y + folder.jumpHeight, folder.z);

      // Cambiar el color si la carpeta está siendo "hovered"
      if (folder.hovered) {
        fill(255, 70, 0); // Cambia esto al color que desees


      } else {
        fill(folder.R, folder.G, folder.B);
      }

      box(7, 60, 40);
      pop();
      
      
     if (folder.hovered && !folder.alreadyHovered) {              
  textFont(myFont);
  fill('rgb(255,70,0)');
  textSize(25);
  textAlign(CENTER);
  displayedText = folder.folder_txt;
         
  folder.alreadyHovered = true; // Mark the folder as already hovered
}
      
      if (!folder.hovered)
        {
          folder.alreadyHovered = false;
          
        }
      text(displayedText, 0, 300);
    }
  }
}

function mouseMoved() {
  // Ajustar la altura de salto de las carpetas cuando el ratón se mueve
  for (let folder of folders) {
    let distance = dist(mouseX, mouseY, folder.x + width / 2, folder.y + height / 2);
    folder.jumpHeight = map(distance, 0, 200, 0, 30);
  }


  
  
}





function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


