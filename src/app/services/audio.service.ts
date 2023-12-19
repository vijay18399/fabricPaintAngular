// audio.service.ts
import { Injectable } from '@angular/core';
import { Howl, Howler } from 'howler';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  static getInstance() {
    throw new Error('Method not implemented.');
  }
  private sounds: Record<string, Howl> = {}; // Map to store multiple sounds

  constructor() {}

  addSound(key: string, src: string): void {
    this.sounds[key] = new Howl({
      src: [src],
    });
  }

  playSound(key: string): void {
    if (this.sounds[key]) {
      this.sounds[key].play();
    }
  }
}
