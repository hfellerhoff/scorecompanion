export interface HasMetadata {
  metadata: {
    moreresultsavailable: boolean;
  };
}

export interface IMSLPResponse {
  intvals: {
    composer: string;
    worktitle: string;
  };
  permlink: string;
}

export interface IMSLPWork {
  title: string;
  composer: string;
  link: string;
}

export interface IMSLPScoreFormat {
  title: string;
  href: string;
  size: string;
}
