import jsPDF from 'jspdf';
import 'AllertaStencil-Regular-normal';

function renderStencilFont() {
    console.log('Rendering Stencil');
    const inputText = document.getElementById('inputText').value.toUpperCase();
    const outputContainer = document.getElementById('output');
    outputContainer.textContent = inputText;
}

function downloadPDF() {

    console.log('Downloading PDF');

    const outputContainer = document.getElementById('output');

    // Create a new instance of jsPDF
    const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [215.9, 279.4],
    });

    // set font
    pdf.setFont('AllertaStencil-Regular', 'normal');
    console.log("font: ", pdf.getFont());

    // Get the text content and calculate its width
    const text = outputContainer.textContent;; 
    const fontSize = 60;
    pdf.setFontSize(fontSize);
    
    // Specify the maximum width for text wrapping
    const maxWidth = 240;

    // Specify the line height
    const lineHeight = 0.4; 

    // Split the text into an array of lines that fit within the maxWidth
    const lines = pdf.splitTextToSize(text, maxWidth);

    // Calculate total height of the text block
    const totalHeight = lines.length * fontSize * lineHeight;

    // Calculate starting Y-coordinate for vertical centering
    const startY = (pdf.internal.pageSize.getHeight() - totalHeight) / 2;

    // Iterate through lines and add text to the PDF
    lines.forEach((line, index) => {
        const centerX = pdf.internal.pageSize.getWidth() / 2;
        const centerY = startY + index * fontSize * lineHeight;
        pdf.text(line, centerX, centerY, { align: 'center' });
    });

    // Save or display the PDF as needed
    const blob = pdf.output('blob');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'light_tagger_stencil.pdf';
    link.click();
}

document.getElementById('renderButton').addEventListener('click', renderStencilFont);
document.getElementById('downloadButton').addEventListener('click', downloadPDF);

document.addEventListener('DOMContentLoaded', function () {
    const suggestedPhrasesList = document.getElementById('suggestedPhrasesList');
    const inputText = document.getElementById('inputText');
    suggestedPhrasesList.addEventListener('click', function (event) {
        if (event.target.tagName === 'LI') {
            console.log("clicked");
            const clickedPhrase = event.target.textContent;
            inputText.value = clickedPhrase;
        }
    });
});