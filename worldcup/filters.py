# -*- coding: utf-8 -*-
"""
Installation:

  1. Install Node.js
  2. Run: ``$ [sudo] npm install -g ember-precompile``
"""

import subprocess

from webassets.filter import Filter, register_filter
from webassets.exceptions import FilterError


class EmberPrecompile(Filter):
  """docstring for HandlebarsFilter"""

  name = 'ember-precompile'

  def input(self, _in, out, **kwargs):
    source = kwargs.get('source_path')

    # We need an input file for the compiler to work
    if source is None:
      raise FilterError('ember-precompile: no input file')

    # Setup the command line executable
    proc = subprocess.Popen(['ember-precompile', source],
      stdout=subprocess.PIPE,
      stderr=subprocess.PIPE
    )

    # Execute the shell command
    stdout, stderr = proc.communicate()

    if proc.returncode != 0:
      message = ("ember-precompile: error in subprocess stderr=%s, stdout=%s, "
                 "returncode=%s" % (stderr, stdout, proc.returncode))
      raise FilterError(message)

    elif stderr:
      print('ember-precompile filter has warnings:', stderr)

    out.write(stdout.decode('utf-8'))


register_filter(EmberPrecompile)
