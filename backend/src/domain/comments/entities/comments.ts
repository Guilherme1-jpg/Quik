export interface CommentProps {
  userId: number;
  postId: number;
  description: string;
  isDeleted?: boolean;
}

export class Comment {
  private _id: number;
  private props: CommentProps;

  constructor(props: CommentProps, id?: number) {
    this._id = id ?? null;
    this.props = {
      ...props,
      isDeleted: props.isDeleted ?? false,
    };
  }

  get id(): number {
    return this._id;
  }

  get userId(): number {
    return this.props.userId;
  }

  get postId(): number {
    return this.props.postId;
  }

  get description(): string {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }

  get isDeleted(): boolean {
    return this.props.isDeleted;
  }

  set isDeleted(isDeleted: boolean) {
    this.props.isDeleted = isDeleted;
  }
}
