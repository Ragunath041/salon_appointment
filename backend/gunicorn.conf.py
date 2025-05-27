# Gunicorn configuration file
import os
import multiprocessing

# Server socket
bind = '0.0.0.0:' + str(int(os.environ.get('PORT', 5000)))

# Worker processes
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = 'sync'
worker_connections = 1000
max_requests = 1000
max_requests_jitter = 50

# Logging
accesslog = '-'  # Log to stdout
errorlog = '-'   # Log to stderr
loglevel = 'info'

# Timeouts
timeout = 120
keepalive = 5

# Security
limit_request_line = 4094
limit_request_fields = 100
limit_request_field_size = 8190

# Debugging
reload = os.environ.get('FLASK_DEBUG') == '1'
