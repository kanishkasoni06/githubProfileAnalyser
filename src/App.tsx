import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import RepositoryList from '@/components/RepositoryList/RepositoryList';
import CommitChart from '@/components/CommitChart/CommitChart';
import { fetchUserRepos, fetchCommitActivity } from '@/lib/githubApi';
import { Repo, CommitActivity } from '@/types/github';
import "./App.css";

export default function App() {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [commitData, setCommitData] = useState<CommitActivity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const reposData = await fetchUserRepos(username);
      setRepos(reposData);

      if (reposData.length > 0) {
        const commitActivity = await fetchCommitActivity(username, reposData[0].name);
        setCommitData(commitActivity);
      }
    } catch (err) {
      setError('Failed to fetch data. Check username or try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 app-container">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8 card">
          <CardHeader className='card-header'>
            <CardTitle>GitHub Profile Analyzer</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-4 search-form">
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username"
                className="flex-1 search-input"
              />
              <Button type="submit" className='search-button' disabled={loading}>
                {loading ? 'Analyzing...' : 'Analyze'}
              </Button>
            </form>
            {error && <p className="mt-2 text-red-500 error-message">{error}</p>}
          </CardContent>
        </Card>

        {repos.length > 0 && (
          <div className="grid gap-8">
            
            <RepositoryList repos={repos} />
            {commitData.length > 0 && <CommitChart data={commitData} />}
          </div>
        )}
      </div>
    </div>
  );
}
