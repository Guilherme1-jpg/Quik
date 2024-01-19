export interface PostProps {
  userId: number;
  title: string;
  description: string;
  image?: string;
  commentsCount?: number;
  views?: number;
  likes?: number;
  dislikes?: number;
  editedAt?: Date;
}

export class Posts {
  private _id: number;
  private props: PostProps;
  private _comments: Comment[];

  constructor(props: PostProps, id?: number, comments?: Comment[]) {
    this._id = id ?? null;
    this.props = {
      ...props,
      commentsCount: props.commentsCount ?? 0,
    };
    this._comments = comments ?? [];
  }

  get id(): number {
    return this._id;
  }

  get userId(): number {
    return this.props.userId;
  }

  get title(): string {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
  }

  get description(): string {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }

  get image(): string | undefined {
    return this.props.image;
  }

  set image(image: string | undefined) {
    this.props.image = image;
  }

  get commentsCount(): number {
    return this.props.commentsCount;
  }

  set commentsCount(commentsCount: number) {
    this.props.commentsCount = commentsCount;
  }

  get comments(): Comment[] {
    return this._comments;
  }

  set comments(comments: Comment[]) {
    this._comments = comments;
  }

  get views(): number {
    return this.props.views;
  }

  set views(views: number) {
    this.props.views = views;
  }

  get likes(): number {
    return this.props.likes;
  }

  set likes(likes: number) {
    this.props.likes = likes;
  }

  get dislikes(): number {
    return this.props.dislikes;
  }

  set dislikes(dislikes: number) {
    this.props.dislikes = dislikes;
  }

  get editedAt(): Date | undefined {
    return this.props.editedAt;
  }
}
