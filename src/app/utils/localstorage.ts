export class LocalStorageUtils {

  public obterUsuario() {
    return JSON.parse(localStorage.getItem('client.user')!);
  }

  public obterTokenUsuario() {
    return localStorage.getItem('client.token');
  }

  public salvarDadosLocaisUsuario(response: any) {
    this.salvarTokenUsuario(response.acessToken);
    this.salvarUsuario(response.userToken);
  }

  public salvarUsuario(user: string) {
    localStorage.setItem('client.user', JSON.stringify(user));
  }

  public salvarTokenUsuario(token: string) {
    localStorage.setItem('client.token', token);
  }

  public limparDadosLocaisUsuario() {
    localStorage.removeItem('client.token');
    localStorage.removeItem('client.user');
  }
}