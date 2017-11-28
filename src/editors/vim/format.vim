function! s:replaceBufferWithLines(lines)
  normal! ggdG
  for l in a:lines
    call append(line("$"), l)
  endfor
  normal! ggdd
endfunction

" Takes the contents of the current buffer and sends it via STDIN to the
" format script. Once the script returns, the formatted text is grabbed from
" the scripts STDOUT and the current buffer's text is replaced with the
" formatted text
function! Format()
  let currentCursorPosition = winsaveview()

  let exe = "node_modules/.bin/criptext-js-tools format --filename " . expand('%') 
  let bufferLines = getline(1, line("$"))
  let formattedLines = systemlist(exe, bufferLines)
  if !empty(formattedLines)
    call s:replaceBufferWithLines(formattedLines)   
    call winrestview(currentCursorPosition)
  endif
endfunction

" map Ctrl+f to format current buffer
nnoremap <C-f> :call Format()<CR>
