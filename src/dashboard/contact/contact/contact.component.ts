import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css'; // Correct way to import the xterm CSS

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  private terminal!: Terminal;
  private commandBuffer: string = ''; // Store the current command input
  @ViewChild('terminal', { static: true }) terminalElement!: ElementRef;

  ngOnInit() {
    this.terminal = new Terminal();
  }

  ngAfterViewInit() {
    this.terminal.open(this.terminalElement.nativeElement);
    this.terminal.writeln('Welcome to the embedded terminal!');

    this.terminal.onKey(e => {
      const char = e.key;
      if (char === 'Backspace') {
        // Handle backspace
        if (this.commandBuffer.length > 0) {
          this.commandBuffer = this.commandBuffer.slice(0, -1); // Remove last character from buffer
          this.terminal.write('\b \b'); // Move back, write a space, and move back again
        }
      } else if (char === 'Enter') {
        // Handle enter key (for executing commands)
        this.terminal.writeln(`\nYou typed: ${this.commandBuffer}`);
        this.commandBuffer = ''; // Clear buffer
      } else {
        // Append character to the buffer and write to terminal
        this.commandBuffer += char;
        this.terminal.write(char);
      }
    });
  }

}
