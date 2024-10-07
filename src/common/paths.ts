export const v0Endpoint = {
    tag: 'v0',
    projects: {
        root: '/api/v0/projects',
        detail: {
            path: ':id',
            id: 'id',
        },
    },
    playSession: {
        root: '/api/v0/projects/:project_id/play_session',
        project_id: 'project_id',
        detail: {
            path: ':session_id',
            id: 'session_id',
        },
        finish: {
            path: 'finish',
        },
    },
    playerPositionLog: {
        root: '/api/v0/projects/:project_id/play_session/:session_id/player_position_log',
        project_id: 'project_id',
        play_session_id: 'session_id',
    },
};
