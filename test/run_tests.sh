#!/bin/bash

set -exuo pipefail

export TEST_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo "Using TEST_DIR = $TEST_DIR"

#echo "Removing old coverage files"
#mkdir -p /var/www/html/test/cov
#find /var/www/html/test/cov -mindepth 1 ! \( -name .gitignore \) -delete

echo "Truncating XDebug coverage file"
truncate -s 0 /var/www/html/test/test_output/cachegrind.out || true

#echo "Running Nexus tests"
#/var/www/html/test/vendor/phpunit/phpunit/phpunit --bootstrap ./bootstrap.php --configuration ./phpunit.xml --colors --testsuite "nexus" || true

#echo "Running Portal tests"
#/var/www/html/test/vendor/phpunit/phpunit/phpunit --bootstrap ./bootstrap.php --configuration ./phpunit.xml --colors --testsuite "leaf" || true

echo "Running All Tests"
/var/www/html/test/vendor/phpunit/phpunit/phpunit --bootstrap ./bootstrap.php \
 --coverage-html=../test_output/html \
 --coverage-php=../test_output/php/code_coverage.php \
 --coverage-text=../test_output/txt/code_coverage.txt \
 --disable-coverage-ignore \
 --strict-coverage \
 --disallow-todo-tests \
 --colors --columns 80 \
 --fail-on-risky --fail-on-warning --cache-result \
 --cache-result-file test_output/cachegrind.out \
 tests
# echo "Generating Coverage Report"
# cd /var/www/html/test/prepend/
# ./vendor/bin/phpcov merge --html="../cov/report/" ../cov -vvv

# (
  # Rename coverage report api folder due to apache ReWrite Rule.
  # cd ../cov/report/
  # mv LEAF_Nexus/api LEAF_Nexus/api-test
  # mv LEAF_Request_Portal/api LEAF_Request_Portal/api-test
  # sed -e 's|api/index|api-test/index|g' -i'' LEAF_Nexus/index.html
  # sed -e 's|api/index|api-test/index|g' -i'' LEAF_Request_Portal/index.html
# )

# echo "Coverage Report: http://localhost/test/cov/report/"
