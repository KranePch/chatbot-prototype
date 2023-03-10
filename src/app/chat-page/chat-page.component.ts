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
          word: "Hello, How can I help ?",
          type: 'api',
        },
        // {
        //   word: "Who am I making this out to? We'll go deliver this crate like professionals, and then we'll go home",
        //   type: 'user',
        // },
      ],
    },
    // {
    //   id: 1,
    //   username: 'Bender',
    //   avatar:
    //     'http://orig02.deviantart.net/9689/f/2012/027/9/c/mr_bender______classy__by_sgtconker1r-d4nqpzu.png',
    //   messages: [
    //     // "Stop! Don't shoot fire stick in space canoe! Cause explosive decompression!",
    //     // "Fry! Stay back! He's too powerful! You guys aren't Santa!",
    //     // "Hi, I'm a naughty nurse, and I really need someone to talk to. $9.95 a minute",
    //     // 'Who are you, my warranty?!',
    //     // 'I will destroy you',
    //   ],
    // },
  ];

  constructor(private http: HttpClient) {}

  add(textForm: any) {
    var vlu = this.value;
    if (this.text) {
      // User send chat
      let userChat = { word: this.text, type: 'user' };
      this.chats[vlu].messages.push(userChat);
      let msg = this.text;
      this.text = '';
      
      // Call back from API
      this.http
        .post<resultResponse>('http://127.0.0.1:8700/complete', {
          // sender: String(vlu),
          message: msg,
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
      $('.loader').delay(250).animate({
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
