import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    hasGithubToken: !!process.env.GITHUB_TOKEN,
    githubTokenLength: process.env.GITHUB_TOKEN ? process.env.GITHUB_TOKEN.length : 0,
    githubTokenPrefix: process.env.GITHUB_TOKEN ? process.env.GITHUB_TOKEN.substring(0, 10) : 'none',
    githubTokenValue: process.env.GITHUB_TOKEN || 'undefined',
    allEnvKeys: Object.keys(process.env).filter(key => key.includes('GITHUB') || key.includes('VERCEL') || key.includes('NODE'))
  });
}
