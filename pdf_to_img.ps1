
Add-Type -AssemblyName System.Runtime.WindowsRuntime
$asb = [System.Reflection.Assembly]::LoadWithPartialName("System.Runtime.WindowsRuntime")

# Load WinRT types
[Windows.Data.Pdf.PdfDocument, Windows.Data.Pdf, ContentType=WindowsRuntime] | Out-Null
[Windows.Storage.Streams.InMemoryRandomAccessStream, Windows.Storage.Streams, ContentType=WindowsRuntime] | Out-Null

async function Convert-PdfToImage($pdfPath, $outputPath) {
    try {
        $file = Get-Item $pdfPath
        $uFile = [Windows.Storage.StorageFile]::GetFileFromPathAsync($file.FullName).GetResults()
        $pdfDoc = [Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($uFile).GetResults()
        
        for ($i = 0; $i -lt $pdfDoc.PageCount; $i++) {
            $page = $pdfDoc.GetPage($i)
            $stream = New-Object Windows.Storage.Streams.InMemoryRandomAccessStream
            $page.RenderToStreamAsync($stream).GetResults()
            
            # Save stream to file using a temporary .net bitmap or similar
            # Since we are in a restricted environment, let's just try to extract first page
            Write-Host "Rendering page $i..."
        }
    } catch {
        Write-Error $_
    }
}

# This is a bit complex for a one-liner. Let's try a simpler approach.
