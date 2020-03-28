#!/bin/bash

function enable_venv {
	# Check if there is a virtual env already enabled
	if [ -n "$VIRTUAL_ENV" ]; then
		return
	fi

	if [ ! -d ./venv ]; then
		install_venv
	fi

	source venv/bin/activate
}

function install_venv {
	python3 -m venv venv
	venv/bin/pip install -r requirements.txt
}
