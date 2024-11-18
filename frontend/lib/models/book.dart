class Book {
  int? id;
  String? title;
  String? description;
  String? publisher;
  int? authorId;
  String? coverImg;
  String? genre;
  String? publishedYear;
  int? copiesAvailable;
  bool? isAvailable;

  Book(
      {this.id,
      this.title,
      this.description,
      this.publisher,
      this.authorId,
      this.coverImg,
      this.genre,
      this.publishedYear,
      this.copiesAvailable,
      this.isAvailable});

  Book.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    title = json['title'];
    description = json['description'];
    publisher = json['publisher'];
    authorId = json['author_id'];
    coverImg = json['cover_img'];
    genre = json['genre'];
    publishedYear = json['published_year'];
    copiesAvailable = json['copies_available'];
    isAvailable = json['is_available'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['title'] = this.title;
    data['description'] = this.description;
    data['publisher'] = this.publisher;
    data['author_id'] = this.authorId;
    data['cover_img'] = this.coverImg;
    data['genre'] = this.genre;
    data['published_year'] = this.publishedYear;
    data['copies_available'] = this.copiesAvailable;
    data['is_available'] = this.isAvailable;
    return data;
  }
}