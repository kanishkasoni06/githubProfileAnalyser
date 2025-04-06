import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Star, GitFork } from 'lucide-react';
import { Repo } from '@/types/github';
import "../App.css"

export default function RepositoryList({ repos }: { repos: Repo[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Public Repositories</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className='repo-table'>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Language</TableHead>
              <TableHead className="text-right">Stats</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {repos.map((repo) => (
              <TableRow key={repo.id}>
                <TableCell className="font-medium">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {repo.name}
                  </a>
                </TableCell>
                <TableCell className="text-gray-600 max-w-xs truncate">
                  {repo.description}
                </TableCell>
                <TableCell>
                  {repo.language && <Badge variant="outline">{repo.language}</Badge>}
                </TableCell>
                <TableCell className="flex gap-4 justify-end">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="h-4 w-4" />
                    <span>{repo.forks_count}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}