module.exports = {
  apps: [
    {
      name: 'next-r3f',
      script: 'npm',
      args: 'run serve',
      exec_mode: 'fork',
      watch: false,
    },
  ],
}
