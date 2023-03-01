import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent {
  text: any;
  value: any;
  index = 0;
  chats = [
    {
      id: 0,
      username: 'Leela',
      avatar: 'https://imgflip.com/s/meme/Futurama-Leela.jpg',
      messages: [
        {
          word: "I can explain. It's very valuable. You won't have time for sleeping, soldier, not with all the bed making you'll be doing",
          type: 'user',
        },
        {
          word: "Who am I making this out to? We'll go deliver this crate like professionals, and then we'll go home",
          type: 'user',
        },
        {
          word: "No! The cat shelter's on to me. I never loved you",
          type: 'user',
        },
        {
          word: "Oh Leela! You're the only person I could turn to",
          type: 'user',
        },
        {
          word: 'Um, is this the boring, peaceful kind of taking to the streets',
          type: 'user',
        },
        {
          word: "That's right, baby. I ain't your loverboy Flexo, the guy you love so much. You even love anyone pretending to be him!",
          type: 'user',
        },
      ],
    },
    {
      id: 1,
      username: 'Bender',
      avatar:
        'http://orig02.deviantart.net/9689/f/2012/027/9/c/mr_bender______classy__by_sgtconker1r-d4nqpzu.png',
      messages: [
        // "Stop! Don't shoot fire stick in space canoe! Cause explosive decompression!",
        // "Fry! Stay back! He's too powerful! You guys aren't Santa!",
        // "Hi, I'm a naughty nurse, and I really need someone to talk to. $9.95 a minute",
        // 'Who are you, my warranty?!',
        // 'I will destroy you',
      ],
    },
    {
      id: 2,
      username: 'Fry',
      avatar:
        'http://www.wallpaperno.com/thumbnails/detail/20121027/futurama%20fry%201920x1080%20wallpaper_www.wallpaperno.com_68.jpg',
      messages: [
        // "Ooh, name it after me! But I've never been to the moon!",
        // "You don't know how to do any of those",
        // 'The key to victory is discipline, and that means a well made bed',
        // "Stop bickering or I'm going to come back there and change your opinions manually",
        // 'Can we have Bender Burgers again',
      ],
    },
    {
      id: 3,
      username: 'Zoidberg',
      avatar:
        'http://images2.fanpop.com/images/photos/3300000/Zoidberg-futurama-3305418-1024-768.jpg',
      messages: [
        // 'All I want is to be a monkey of moderate intelligence who wears a suit',
        // "Oh, I don't have time for this",
        // 'No! The kind with looting and maybe starting a few fires!',
        // 'Now, now. Perfectly symmetrical violence never solved anything',
        // 'Dissect its brain',
      ],
    },
  ];

  constructor(private http: HttpClient) {}

  add(textForm: any) {
    var vlu = this.value;
    if (this.text) {
      // User send chat
      let userChat = { word: this.text, type: 'user' };
      this.chats[vlu].messages.push(userChat);
      this.text = '';

      // Call back from API
      this.http
        .post<resultResponse>('http://192.168.10.207:8700/check_msg', {
          sender: String(vlu),
          message: textForm,
        })
        .subscribe((res) => {
          console.log(res);
          if (res.status && res.message) {
            let callback = { word: res.message, type: 'api' };
            this.chats[vlu].messages.push(callback);
          }
          console.log(this.chats[vlu]);
        });
    }

    this.scroll();
  }

  uid(ix: any) {
    console.log(ix);

    setTimeout(() => {
      this.value = ix;
    }, 750);

    this.initScroll();

    $('.init').animate(
      {
        opacity: '0',
      },
      500
    );

    if (this.index == 1) {
      this.index = 0;
      $('.message-wrap').find('.message').css({
        opacity: '1',
      });
    } else {
      this.index = 0;
      $('.message-wrap').find('.message').css({
        opacity: '0',
      });
      $('.loader').delay(500).animate({
        opacity: '1',
      });
      setTimeout(() => {
        this.index = 0;
        $('.message-wrap').find('.message').css({
          opacity: '1',
        });
        $('.loader').animate({
          opacity: '0',
        });
      }, 3000);
    }
  }

  initScroll() {
    $('.message-wrap').animate(
      {
        scrollTop: $('main').height(),
      },
      1000
    );
  }

  scroll() {
    $('.message-wrap').animate(
      {
        scrollTop: 9000,
      },
      1000
    );
  }
}

interface resultResponse {
  status?: boolean;
  code?: number;
  message?: string;
  recipient_id?: string;
}
