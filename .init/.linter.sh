#!/bin/bash
cd /home/kavia/workspace/code-generation/global-shipping-website-builder-4849-4858/shipping_company_frontend
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

