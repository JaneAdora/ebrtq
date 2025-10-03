import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { resources, siteSettings, customTypes, password } = req.body;

  // Simple password check
  if (password !== 'VCL0cbQLFmGLcK7Wfo0I') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // GitHub API configuration
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const REPO_OWNER = 'JaneAdora';
    const REPO_NAME = 'ebrtq';
    const FILE_PATH = 'src/data/resources.json';

    console.log('Environment check:', {
      hasToken: !!GITHUB_TOKEN,
      tokenLength: GITHUB_TOKEN ? GITHUB_TOKEN.length : 0,
      tokenPrefix: GITHUB_TOKEN ? GITHUB_TOKEN.substring(0, 10) : 'none',
      allEnvVars: Object.keys(process.env).filter(key => key.includes('GITHUB') || key.includes('VERCEL'))
    });

    if (!GITHUB_TOKEN) {
      throw new Error('GitHub token not configured');
    }

    // Get current file to get the SHA
    const currentFileResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    if (!currentFileResponse.ok) {
      throw new Error(`Failed to get current file: ${currentFileResponse.statusText}`);
    }

    const currentFile = await currentFileResponse.json();
    
    // Create the new content
    const newContent = {
      resources,
      siteSettings,
      customTypes
    };
    
    const encodedContent = Buffer.from(JSON.stringify(newContent, null, 2)).toString('base64');

    // Update the file
    const updateResponse = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `Update resources - ${new Date().toISOString()}`,
          content: encodedContent,
          sha: currentFile.sha
        })
      }
    );

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      throw new Error(`Failed to update file: ${updateResponse.statusText} - ${JSON.stringify(errorData)}`);
    }

    res.status(200).json({ 
      success: true, 
      message: 'Resources saved successfully to GitHub',
      resources: resources.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error saving content:', error);
    res.status(500).json({ 
      error: 'Failed to save content',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
