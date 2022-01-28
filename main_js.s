#include "textflag.h"

TEXT ·oomStart(SB), NOSPLIT, $0
  CallImport
  RET

TEXT ·oomTest(SB), NOSPLIT, $0
  CallImport
  RET

TEXT ·oomEnd(SB), NOSPLIT, $0
  CallImport
  RET
