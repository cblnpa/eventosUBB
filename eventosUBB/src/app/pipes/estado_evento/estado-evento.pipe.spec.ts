import { EstadoEventoPipe } from '../estado-evento.pipe';

describe('EstadoEventoPipe', () => {
  it('create an instance', () => {
    const pipe = new EstadoEventoPipe();
    expect(pipe).toBeTruthy();
  });
});
