import React, { useState, useEffect } from 'react';
import { Github, Star, GitFork, ExternalLink, RefreshCw, Code2, Sparkles, Check, Edit3 } from 'lucide-react';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  topics: string[];
  homepage: string | null;
  default_branch: string;
}

interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Python: '#3776AB',
  HTML: '#E34F26',
  CSS: '#1572B6',
  Rust: '#DEA584',
  Go: '#00ADD8',
  PHP: '#777BB4',
  Shell: '#89E051',
  C: '#555555',
  'C++': '#F34B7D',
};

const DEFAULT_USERNAME = 'bhaiyu00';

export const GitHubShowcase: React.FC = () => {
  const [username, setUsername] = useState<string>(() => {
    const saved = localStorage.getItem('bhaiyu_github_username');
    if (saved && saved !== 'nishantbarman2164-prog') return saved;
    return DEFAULT_USERNAME;
  });
  const [inputUsername, setInputUsername] = useState<string>(username);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [userProfile, setUserProfile] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const fetchGitHubData = async (targetUser: string) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch User Profile
      const userRes = await fetch(`https://api.github.com/users/${targetUser}`, {
        headers: { Accept: 'application/vnd.github.v3+json' },
      });

      if (!userRes.ok) {
        if (userRes.status === 404) {
          throw new Error(`GitHub user "${targetUser}" not found.`);
        }
        throw new Error(`GitHub API error (${userRes.status}).`);
      }
      const userData: GitHubUser = await userRes.json();
      setUserProfile(userData);

      // 2. Fetch Repositories
      const reposRes = await fetch(
        `https://api.github.com/users/${targetUser}/repos?sort=pushed&per_page=12`,
        { headers: { Accept: 'application/vnd.github.v3+json' } }
      );
      if (!reposRes.ok) throw new Error('Failed to fetch repositories.');
      const reposData: GitHubRepo[] = await reposRes.json();
      setRepos(reposData);
      setLastRefreshed(new Date());
      localStorage.setItem('bhaiyu_github_username', targetUser);
    } catch (err: any) {
      console.error('Error fetching GitHub data:', err);
      setError(err?.message || 'Failed to load GitHub data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData(username);
  }, [username]);

  const handleUpdateUsername = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputUsername.trim();
    if (clean) {
      setUsername(clean);
      setIsEditingUsername(false);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <section id="github" className="py-24 sm:py-36 bg-[#FAF9F6] border-t border-[#EAE6DD] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] uppercase tracking-[0.25em] font-mono-code font-bold text-[#666666]">
                03 — LIVE CODEBASE & REPOSITORIES
              </span>
              <span className="w-8 h-px bg-[#D9D6CD]" />
              <span className="font-handwriting text-lg text-[#FF887D]">open source telemetry</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#1A1A1A]">
              Live from GitHub.
            </h2>
          </div>

          {/* Real-time GitHub Profile Link & Quick Sync Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-md"
            >
              <Github className="w-4 h-4" />
              <span>github.com/{username}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => fetchGitHubData(username)}
              disabled={loading}
              className="p-2.5 rounded-full bg-white border border-[#E5E0D5] text-[#1A1A1A] hover:bg-[#F0ECE4] transition-all shadow-2xs"
              title="Refresh GitHub repositories"
              aria-label="Refresh GitHub repositories"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#FF887D]' : ''}`} />
            </button>
          </div>
        </div>

        {/* GitHub Live Profile Card & Quick Handle Switcher */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E4DA] shadow-sm mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* User Bio & Avatar */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={userProfile?.avatar_url || '/assets/aistudio/imagesprofile_clean.jpg'}
                  alt={userProfile?.login || username}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#1A1A1A] shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#10B981] border-2 border-white flex items-center justify-center text-[10px] text-white font-bold" title="Live Synced">
                  ✓
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-black text-[#1A1A1A]">
                    {userProfile?.name || 'Nishant (bhaiyu)'}
                  </h3>
                  <span className="text-xs font-mono-code text-[#666666] bg-[#FAF9F6] px-2.5 py-0.5 rounded-md border border-[#E8E4DA]">
                    @{username}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#555555] mt-1 max-w-xl">
                  {userProfile?.bio || 'Creative developer building expressive websites, interactive interfaces, and intelligent automation.'}
                </p>

                <div className="flex items-center gap-3 mt-2 text-xs font-mono-code text-[#777777]">
                  <span>{userProfile?.public_repos ?? repos.length} Public Repositories</span>
                  <span>·</span>
                  <span>Synced {lastRefreshed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>

            {/* Quick Switch / Custom Handle Input */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {isEditingUsername ? (
                <form onSubmit={handleUpdateUsername} className="flex items-center gap-2 bg-[#FAF9F6] p-1.5 rounded-2xl border border-[#E0DCD2]">
                  <span className="text-xs font-mono-code text-[#888888] pl-2">github.com/</span>
                  <input
                    type="text"
                    value={inputUsername}
                    onChange={(e) => setInputUsername(e.target.value)}
                    placeholder="username"
                    className="px-2 py-1 bg-white border border-[#DDD8CE] rounded-lg text-xs font-mono-code text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="p-1.5 bg-[#1A1A1A] text-white rounded-lg hover:bg-black transition-colors"
                    title="Save handle"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setInputUsername(username);
                      setIsEditingUsername(false);
                    }}
                    className="px-2 text-xs text-[#888888] hover:text-[#111111]"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsEditingUsername(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF9F6] hover:bg-[#F2ECE1] border border-[#E0DCD2] rounded-xl text-xs font-mono-code text-[#555555] hover:text-[#111111] transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#FF887D]" />
                  <span>Switch GitHub Handle</span>
                </button>
              )}

              <a
                href={`https://github.com/${username}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white hover:bg-[#FAF9F6] border border-[#E0DCD2] rounded-xl text-xs font-bold text-[#1A1A1A] transition-all shadow-2xs"
              >
                <span>View All Repos</span>
                <ExternalLink className="w-3 h-3 text-[#777777]" />
              </a>
            </div>
          </div>
        </div>

        {/* Repositories Display Grid */}
        {loading && repos.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-6 border border-[#E8E4DA] animate-pulse space-y-4">
                <div className="h-5 bg-[#EAE6DD] rounded w-3/4" />
                <div className="h-12 bg-[#F2ECE1] rounded w-full" />
                <div className="flex gap-3">
                  <div className="h-4 bg-[#EAE6DD] rounded w-16" />
                  <div className="h-4 bg-[#EAE6DD] rounded w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-[#FFF4F2] border border-[#FF887D]/40 rounded-2xl p-6 text-center space-y-3">
            <p className="text-sm font-semibold text-[#841910]">{error}</p>
            <p className="text-xs text-[#555555]">
              Verify your GitHub handle above or check internet connection.
            </p>
            <button
              onClick={() => {
                setUsername(DEFAULT_USERNAME);
                setInputUsername(DEFAULT_USERNAME);
                fetchGitHubData(DEFAULT_USERNAME);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black transition-all"
            >
              <span>Reset to @{DEFAULT_USERNAME}</span>
            </button>
          </div>
        ) : repos.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 border border-[#E8E4DA] text-center space-y-4">
            <Code2 className="w-10 h-10 text-[#FF887D] mx-auto" />
            <h4 className="text-xl font-bold text-[#1A1A1A]">No Public Repositories Found Yet</h4>
            <p className="text-sm text-[#666666] max-w-md mx-auto">
              Repositories created under <span className="font-mono-code font-bold">@{username}</span> will automatically appear here live via GitHub API.
            </p>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1A1A1A] text-white text-xs font-bold uppercase rounded-full hover:bg-black transition-all"
            >
              <Github className="w-4 h-4" />
              <span>Open GitHub Profile</span>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => {
              const langColor = repo.language ? LANGUAGE_COLORS[repo.language] || '#888888' : '#888888';
              return (
                <div
                  key={repo.id}
                  className="group bg-white rounded-2xl p-6 border border-[#E8E4DA] shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between hover:border-[#1A1A1A] scroll-skew-reactive"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <Code2 className="w-4 h-4 text-[#FF887D] shrink-0" />
                        <h4 className="font-bold text-base text-[#1A1A1A] truncate group-hover:text-[#FF887D] transition-colors">
                          {repo.name}
                        </h4>
                      </div>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-[#888888] hover:text-[#111111] transition-colors shrink-0"
                        title="View on GitHub"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    <p className="text-xs text-[#555555] leading-relaxed line-clamp-3 min-h-[3rem]">
                      {repo.description || 'Open source project repository by Nishant Barman.'}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#F2ECE1] flex items-center justify-between text-xs font-mono-code text-[#777777]">
                    <div className="flex items-center gap-4">
                      {repo.language && (
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: langColor }}
                          />
                          <span className="text-[#333333] font-semibold">{repo.language}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-[#EAB308]" />
                        <span>{repo.stargazers_count}</span>
                      </div>

                      {repo.forks_count > 0 && (
                        <div className="flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5 text-[#888888]" />
                          <span>{repo.forks_count}</span>
                        </div>
                      )}
                    </div>

                    <span className="text-[11px] text-[#999999]">
                      Updated {formatDate(repo.pushed_at)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Banner with Nishant's Commit Pledge */}
        <div className="mt-12 p-6 sm:p-8 bg-[#FAF0E6]/80 rounded-3xl border border-[#E8DCC8] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-[#7A2706] block">
              COLLABORATION & OPEN SOURCE
            </span>
            <p className="text-base sm:text-lg font-bold text-[#1A1A1A]">
              Want to see more code or collaborate on an experimental build?
            </p>
            <p className="text-xs text-[#666666]">
              All client systems, automations, and frontend experiments start with real, tested git commits.
            </p>
          </div>

          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-md shrink-0"
          >
            <Github className="w-4 h-4" />
            <span>Follow @{username}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
