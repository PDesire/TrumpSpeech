import { mount } from '@vue/test-utils';
import WordGenCard from '~/components/WordGenCard';

describe('WordGenCard', () => {
  test('Vue instance', () => {
    const wrapper = mount(WordGenCard);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
