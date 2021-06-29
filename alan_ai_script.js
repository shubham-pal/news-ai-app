// Alan AI Script file

intent('What does this app do?', 'What can I do here?', 
       reply('This is a news app created by Shubham Pal. You can get news on voice commands. Ask me for any news.'));

const API_KEY = 'NEWS_API_KEY';
let savedArticles = [];

// API endpoints
// News by categories
const CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const CATEGORIES_INTENT = `${CATEGORIES.map((category) => `${category}~${category}`).join('|')}`
intent(`(show|what is|tell me|what's|what are|what're|read|give me) (the|) (recent|latest|) $(N news|headline|articles) (in|about|on|) $(C~ ${CATEGORIES_INTENT})`, 
       `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines)`, (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;
//     console.log(p.TERM.value);
    if (p.C.value) {
        NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`;
    }
    
    api.request(NEWS_API_URL, (error, response, body) => {
//         console.log(body);
        
        const { articles } = JSON.parse(body);
        
        if (!articles.length) {
            p.play('Sorry, please try searching for a different category.');
            return;
        }
        
        savedArticles = articles;
        
        p.play({ command: 'newHeadlines', articles });
        if (p.C.value) {
            p.play(`Here are the (latest|recent) articles on ${p.C.value}`);
        } else {
            p.play(`Here are the (latest|recent) news`);
        }
        
        p.play('Would you like me to read the news');
        p.then(readNews);
    });
});

// News by source
intent('Give me the news from $(SOURCE* (.+))', (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;
//     console.log(p.SOURCE.value);
    if (p.SOURCE.value) {
        NEWS_API_URL = `${NEWS_API_URL}&sources=${p.SOURCE.value.toLowerCase().split(" ").join('-')}`;
    }
    
    api.request(NEWS_API_URL, (error, response, body) => {
//         console.log(body);
        
        const { articles } = JSON.parse(body);
        
        if (!articles.length) {
            p.play('Unidentified source, Pleae try searching for news from another source.');
            return;
        }
        
        savedArticles = articles;
        
        p.play({ command: 'newHeadlines', articles });
        p.play(`Here are the (latest|recent) news from ${p.SOURCE.value}`);
        
        p.play('Would you like me to read the news');
        p.then(readNews);
    });
});

// News by terms
intent('What\'s up with $(TERM* (.+))', (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`;
//     console.log(p.TERM.value);
    if (p.TERM.value) {
        NEWS_API_URL = `${NEWS_API_URL}&q=${p.TERM.value}`;
    }
    
    api.request(NEWS_API_URL, (error, response, body) => {
//         console.log(body);
        
        const { articles } = JSON.parse(body);
        
        if (!articles.length) {
            p.play('Sorry, please try searching for something else.');
            return;
        }
        
        savedArticles = articles;
        
        p.play({ command: 'newHeadlines', articles });
        p.play(`Here are the (latest|recent) articles on ${p.TERM.value}`);
        
        p.play('Would you like me to read the news');
        p.then(readNews);
        
    });
});

// News read
intent('(please|) read (out|) (the|) (news|articles)', (p) => {
    if (!savedArticles.length) {
        p.play('There are no (news|articles) to read. If you want then I can search for you.');
        return;
    }
    savedArticles.map((article, index) => {
        p.play(`(news|article) ${index + 1}`);
        p.play(article.title);
        p.play(article.description);
    });
});

const readNews = context(() => {
    intent('yes', async (p) => {
        savedArticles.map((article, index) => {
            p.play(`(news|article) ${index + 1}`);
            p.play(article.title);
            p.play(article.description);
        });
    });
    
    intent('no', (p) => {
        p.play('Sure, sounds good to me.');
    });
});