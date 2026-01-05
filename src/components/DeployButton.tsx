import { useState } from 'react';
import { Download, ExternalLink, Github, Globe, Loader2 } from 'lucide-react';
import JSZip from 'jszip';
import sha1 from 'sha1';

interface GeneratedCode {
  html: string;
  css: string;
  js: string;
}

interface DeployButtonProps {
  generatedCode: GeneratedCode;
  projectName?: string;
}

const DeployButton = ({ generatedCode, projectName = 'my-website' }: DeployButtonProps) => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState<string>('');

  const generateFiles = () => {
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${projectName}</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
${generatedCode.html}
  <script src="script.js"></script>
</body>
</html>`;

    return {
      'index.html': indexHtml,
      'style.css': generatedCode.css,
      'script.js': generatedCode.js,
    };
  };

  const downloadAsZip = async () => {
    try {
      setIsDeploying(true);
      setDeployStatus('Creating ZIP file...');
      
      const files = generateFiles();
      const zip = new JSZip();

      for (const [filename, content] of Object.entries(files)) {
        zip.file(filename, content);
      }

      setDeployStatus('Generating download...');
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${projectName}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDeployStatus('Download complete!');
      
      // Open Netlify drag-drop page
      setTimeout(() => {
        window.open('https://app.netlify.com/drop', '_blank');
        setDeployStatus('');
      }, 1000);
    } catch (error) {
      console.error('Download error:', error);
      setDeployStatus('Download failed. Please try again.');
    } finally {
      setIsDeploying(false);
      setTimeout(() => setDeployStatus(''), 3000);
    }
  };

  const deployToNetlify = async () => {
    const files = generateFiles();
    
    // ⚠️ REPLACE THIS WITH YOUR NETLIFY TOKEN
    // Get it from: https://app.netlify.com/user/applications/personal
    const token = import.meta.env.VITE_NETLIFY_DEPLOY_KEY;
    
    if (!token) {
      alert("⚠️ Missing Netlify Deploy Key!\n\nAdd VITE_NETLIFY_DEPLOY_KEY to your .env file.\nGet your token from: https://app.netlify.com/user/applications/personal");
      return;
    }

    try {
      setIsDeploying(true);
      setDeployStatus('Creating deployment...');

      // Prepare files with SHA
      const fileEntries = Object.entries(files).map(([path, content]) => ({
        path,
        content: new TextEncoder().encode(content),
        sha: sha1(content),
      }));

      const deployFilesMap: Record<string, string> = {};
      fileEntries.forEach(file => {
        deployFilesMap[file.path] = file.sha;
      });

      // 1. Create new site
      setDeployStatus('Creating Netlify site...');
      const deployRes = await fetch('https://api.netlify.com/api/v1/sites', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: `karrish-${Date.now()}` 
        }),
      });

      if (!deployRes.ok) {
        throw new Error(`Failed to create site: ${deployRes.statusText}`);
      }

      const siteData = await deployRes.json();

      // 2. Create deploy
      setDeployStatus('Creating deploy...');
      const deployCreateRes = await fetch(
        `https://api.netlify.com/api/v1/sites/${siteData.id}/deploys`, 
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            files: deployFilesMap,
          }),
        }
      );

      if (!deployCreateRes.ok) {
        throw new Error(`Failed to create deploy: ${deployCreateRes.statusText}`);
      }

      const deployData = await deployCreateRes.json();

      // 3. Upload files
      setDeployStatus('Uploading files...');
      await Promise.all(
        fileEntries.map(file => 
          fetch(
            `https://api.netlify.com/api/v1/deploys/${deployData.id}/files/${file.path}`, 
            {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/octet-stream',
              },
              body: file.content,
            }
          )
        )
      );

      // 4. Open deployed site
      setDeployStatus('Deploy successful! Opening site...');
      const liveUrl = deployData.deploy_ssl_url || deployData.ssl_url || `https://${siteData.name}.netlify.app`;
      
      setTimeout(() => {
        window.open(liveUrl, '_blank');
        setDeployStatus('');
      }, 1000);

    } catch (error) {
      console.error('Deploy error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setDeployStatus(`Deploy failed: ${errorMessage}`);
      alert(`Deploy failed!\n\n${errorMessage}\n\nCheck console for details.`);
    } finally {
      setIsDeploying(false);
      setTimeout(() => setDeployStatus(''), 5000);
    }
  };

  const deployToGitHub = () => {
    // Download first, then open GitHub
    downloadAsZip();
    setTimeout(() => {
      window.open('https://github.com/new', '_blank');
    }, 500);
  };

  const deployToVercel = () => {
    // Download first, then open Vercel
    downloadAsZip();
    setTimeout(() => {
      window.open('https://vercel.com/new', '_blank');
    }, 500);
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white flex items-center">
          <Globe className="w-6 h-6 mr-3 text-emerald-400" />
          Deploy Your Website
        </h3>
        {deployStatus && (
          <span className="text-sm text-emerald-400 animate-pulse">
            {deployStatus}
          </span>
        )}
      </div>

      <div className="space-y-4">
        {/* Primary Deploy Button */}
        <button
          onClick={downloadAsZip}
          disabled={isDeploying}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center shadow-lg shadow-green-500/30"
        >
          {isDeploying ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Preparing...
            </>
          ) : (
            <>
              <Download className="w-5 h-5 mr-2" />
              Download & Deploy to Netlify
            </>
          )}
        </button>

        {/* Instant Deploy Button */}
        <button
          onClick={deployToNetlify}
          disabled={isDeploying}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center shadow-lg shadow-purple-500/30"
        >
          {isDeploying ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Deploying...
            </>
          ) : (
            <>
              <ExternalLink className="w-5 h-5 mr-2" />
              Instant Deploy to Netlify
            </>
          )}
        </button>

        {/* Other Platform Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={deployToGitHub}
            disabled={isDeploying}
            className="flex items-center justify-center px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all duration-300 border border-slate-700 hover:border-slate-600 disabled:opacity-50"
          >
            <Github className="w-4 h-4 mr-2" />
            Deploy to GitHub
          </button>

          <button
            onClick={deployToVercel}
            disabled={isDeploying}
            className="flex items-center justify-center px-4 py-3 bg-black hover:bg-slate-900 text-white rounded-xl transition-all duration-300 border border-slate-700 hover:border-slate-600 disabled:opacity-50"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Deploy to Vercel
          </button>
        </div>

        {/* Info Text */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mt-4">
          <p className="text-blue-300 text-sm leading-relaxed">
            💡 <strong>Tip:</strong> Click "Download & Deploy" to get your files and upload them to Netlify's drag-and-drop interface, or use "Instant Deploy" for automatic deployment (requires API key).
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeployButton;