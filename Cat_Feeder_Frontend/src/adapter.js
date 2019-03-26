class Adapter {
  constructor(model) {
    this.model = model
    this.baseUrl = `http://localhost:3000/api/v1/${this.model}`;
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  fetchItems() {
    return this.get(`${this.baseUrl}`);
  }

  updateItem(id, body) {
    return this.patch(`${this.baseUrl}/${id}`, body);
  }

  get(url) {
    return fetch(url).then(res => res.json());
  }

  patch(url, body) {
    return fetch(url, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(body),
    }).then(res => res.json());
  }
}
