module.exports = {
	apps: [
		{
			name: 'flicks.flowdrive.ai',
			script: 'build/index.js',
			env_production: {
				ORIGIN: 'https://flicks.flowdrive.ai',
				NODE_ENV: 'production',
				PUBLIC_API_URL: 'https://staging-api.flowdrive.ai',
				PORT: 5173
			}
		}
	],

	deploy: {
		production: {
			user: 'admin',
			host: 'node1.flowdrive.ai',
			ref: 'origin/main',
			repo: 'git@github.com:flowdriveai/flicks',
			path: '/home/admin/services/flicks',
			'post-deploy':
				'npm install && npm run build && pm2 reload ecosystem.config.cjs --env production'
		}
	}
};
