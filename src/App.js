
import { useState } from 'react';
import { Formik, Form, Field } from 'formik'
import './header.css'
import './content.css'
import './article.css'

const App = () => {
  const [photos, setphotos] = useState([]);
  const open=url=>window.open(url)
  console.log({ photos });
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async values => {
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=30&query=${values.search}`, {
              headers: {
                'Authorization': 'Client-ID WXgzFW010ZVvwoVks2PRvCs9N_O9d6kbSUV-3hWP7yY'
              }
            })
            const data = await response.json()
            //llamar a api de unsplasj
            setphotos(data.results);
          }}
        >
          <Form>
            <Field name='search' />
          </Form>
        </Formik>
      </header>
      <div className='container'>
        <div className='center'>
          {photos.map(photo =>
            <article key={photo.id} onClick={()=> open(photo.links.html)}>
              <img src={photo.urls.regular} />
              <p>{[photo.description,photo.alt_description].join('-')}</p>
            </article>)}

        </div>
      </div>
    </div>
  );
}

export default App;
