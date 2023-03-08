const { PDFDocument } = require('pdf-lib');

exports.lambdaHandler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    console.log(data);
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    let y = 700;
    for (const [key, value] of Object.entries(data)) {
      page.drawText(`${key}: ${value}`, { x: 50, y });
      y -= 20;
    }
    const pdfBytes = await pdfDoc.save();
    const response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=report.pdf',
      },
      body: pdfBytes.toString('base64'),
      isBase64Encoded: true,
    };
    return response;
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: 'An internal server error occurred.',
    };
  }
};
