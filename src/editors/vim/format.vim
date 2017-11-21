function! s:replaceBufferWithLines(lines)
  normal! ggdGH
  for l in a:lines
    call append(line("$"), l)
  endfor
  normal! ggdd
endfunction

function! Format()
  let exe = "node_modules/.bin/criptext-js-tools format " . expand('%') 
  let formattedLines = systemlist(exe)
  if !empty(formattedLines)
    call s:replaceBufferWithLines(formattedLines)   
  endif
endfunction

