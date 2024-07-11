// for the podcast
fetch('https://feeds.buzzsprout.com/2366613.rss')
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
        .then(data => {            
            const itemList = data.querySelectorAll('item');
            const items=[];
            itemList.forEach(el => {
                console.log(el)
                items.push({
                pubDate: new Date(el.querySelector('pubDate').textContent),
                title: el.querySelector('title').innerHTML,
                mp3: el.querySelector('enclosure').getAttribute('url')
                });
            });

			console.log(items)
        });

// HTML RESPONSE
(
<item>
    <itunes:title xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">Episode 1: Swabhimaan Charitable Trust</itunes:title>
    <title>Episode 1: Swabhimaan Charitable Trust</title>
    <itunes:summary xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"><![CDATA[ImpactPlease is a Charity Showcase podcast. We bring you grass roots work done by non-profits from around the world. We hope to bring together change-enablers and change-makers, for lasting impact.In this episode we explore the Swabhimaan Charitable Trust, Bengaluru India. ]]></itunes:summary>
    <description><![CDATA[<p>ImpactPlease is a Charity Showcase podcast. We bring you grass roots work done by non-profits from around the world. We hope to bring together change-enablers and change-makers, for lasting impact.<br/><br/>In this episode we explore the Swabhimaan Charitable Trust, Bengaluru India. </p>]]></description>
    <content:encoded xmlns:content="http://purl.org/rss/1.0/modules/content/"><![CDATA[<p>ImpactPlease is a Charity Showcase podcast. We bring you grass roots work done by non-profits from around the world. We hope to bring together change-enablers and change-makers, for lasting impact.<br/><br/>In this episode we explore the Swabhimaan Charitable Trust, Bengaluru India. </p>]]></content:encoded>
    <itunes:image xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" href="https://storage.buzzsprout.com/xj3lzty5jhlvsadzjpdfzktu2840?.jpg"/>
    <itunes:author xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">Usha</itunes:author>
    <enclosure url="https://www.buzzsprout.com/2366613/15162307-episode-1-swabhimaan-charitable-trust.mp3" length="12058353" type="audio/mpeg"/>
    <guid isPermaLink="false">Buzzsprout-15162307</guid>
    <pubDate>Thu, 30 May 2024 06:00:00 -0400</pubDate>
    <itunes:duration xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">1239</itunes:duration>
    <itunes:keywords xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"/>
    <itunes:season xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">1</itunes:season>
    <itunes:episode xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">1</itunes:episode>
    <itunes:episodeType xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">full</itunes:episodeType>
    <itunes:explicit xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">false</itunes:explicit>
  </item>)
