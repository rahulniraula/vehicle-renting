#!/bin/bash
cd frontend
ng build --deploy-url=static/
mkdir ../backend/static -p
cp dist/frontend/* ../backend/static -r