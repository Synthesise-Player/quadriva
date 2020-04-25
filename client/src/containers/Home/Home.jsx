import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../elements/ButtonWhite';

import {
  Hero, wrapper, one, two, bottom, Coo,
} from './Home.module.css';

export default () => (
  <div>
    <div className={Hero}>
      <div className={wrapper}>
        <div className={one}>
          <div>
            <h1>QUADRIVIA</h1>
            <p>Test your knowledge on your favourite Spotify playlists</p>
          </div>
        </div>
        <div className={two}>
          <Link to="/search">
            <Button isPink>
              <p>Play Now!</p>
            </Button>
          </Link>
        </div>
        <div className={bottom} />
      </div>
    </div>
    <div className={Coo}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non tortor ex. Fusce nisl neque, mattis in nisi at, feugiat porttitor elit. Fusce ultricies ut felis id iaculis. Duis auctor nulla et nisl iaculis rutrum. Aliquam vulputate tristique velit ut vestibulum. Mauris viverra, leo vitae condimentum posuere, velit leo fermentum nulla, nec consequat elit nisi ac libero. Donec vestibulum feugiat mauris, vel bibendum mi semper sit amet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras pulvinar magna quis nisl tincidunt, quis aliquam tellus euismod.
        Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed rhoncus purus quis maximus ornare. Pellentesque ligula tortor, vestibulum sit amet sem vitae, lacinia elementum nisl. Sed molestie eros malesuada quam dignissim, et consectetur quam interdum. Fusce feugiat ante sollicitudin sem faucibus, id aliquet purus euismod. Etiam sit amet nisl faucibus nunc eleifend malesuada. Ut imperdiet justo sit amet nisl gravida mollis. Aenean ullamcorper quam tortor, in aliquam urna gravida eget. Donec sem quam, volutpat eget accumsan vel, eleifend in eros.
        Nulla vitae quam nec felis porta rhoncus in vel magna. Pellentesque sed elit malesuada, lacinia dolor ac, rutrum dui. Phasellus accumsan cursus odio, at varius eros malesuada quis. Donec ullamcorper pharetra facilisis. Curabitur aliquet bibendum dolor, sit amet luctus metus ullamcorper in. Suspendisse ligula turpis, vestibulum eget lectus sed, imperdiet dignissim nibh. Donec accumsan, lectus quis euismod lacinia, turpis elit euismod ligula, non porttitor tellus tortor et libero. In a lorem vel sapien consectetur sodales eget sit amet odio. Integer consequat risus sed metus pretium finibus quis non lectus. Proin ipsum risus, elementum et metus in, accumsan aliquam magna. Nunc nec mauris ut nunc tincidunt suscipit a at est. Vestibulum vel euismod enim. Aenean et dui commodo, vestibulum dui at, laoreet nulla. Sed nec augue vitae lorem luctus ornare et iaculis felis. Phasellus iaculis tincidunt est, vel sodales sem vulputate in. Morbi nec ornare lectus, a bibendum ipsum.
        Sed id iaculis dolor. Cras in dolor nibh. Sed sollicitudin lacus nec mi dictum, vel posuere metus feugiat. Nam pellentesque arcu et eros venenatis, sed efficitur sem rhoncus. Nam scelerisque a lacus eget hendrerit. Nam a mattis urna. Nunc eleifend quam eget nibh posuere vestibulum. Aliquam vel massa libero.
      </p>
    </div>
  </div>
);
