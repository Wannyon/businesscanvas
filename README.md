# businesscanvas
# 비즈니스캔버스 프론트엔드 개발자 채용 과제

1. **중점 확인 사항**
    1. **추상화:** 비즈니스캔버스 개발팀은 인터페이스와 추상화를 중요하게 생각합니다. 지원자 분의 추상화 능력을 마음껏 보여주세요.
    2. **CSS:** 프론트엔드 개발자로서의 CSS 역량을 파악하고자 합니다. [Figma](https://www.figma.com/design/dxmIaXbozcjrztnYsOOb8D/%EA%B0%9C%EB%B0%9C-%EA%B3%BC%EC%A0%9C?node-id=0-1&t=MrrSiIa1dPcoL6my-1)로 제공된 UI와 최대한 동일한 UI를 만들어주세요.
    3. **개발 역량:** 업무 처리 능력을 파악하기 위해 과제의 완성도와 작업 기간을 함께 검토합니다. 커밋 컨벤션은 따로 존재하지 않지만 지원자 분의 의도를 파악하기 쉽도록 작은 단위로 여러번 커밋해주세요.
2. **기한**: 3일 (시작시점으로부터 72시간)
3. **디자인**: [Figma](https://www.figma.com/design/dxmIaXbozcjrztnYsOOb8D/%EA%B0%9C%EB%B0%9C-%EA%B3%BC%EC%A0%9C?node-id=0-1&t=MrrSiIa1dPcoL6my-1)
4. **스택:** React는 필수로 사용해야하며, 그 외 라이브러리는 자유롭게 활용 가능합니다.
5. **내용:** 회원 목록을 관리할 수 있는 테이블을 만드는 것이 목표입니다.
    1. 회원 하나 하나의 데이터를 **레코드(Record)**라고 부릅니다.
    2. 레코드를 이루고 있는 속성들을 **필드(Field)**라고 부릅니다.
    3. **필드**
        1. 필드는 `type`, `label`, `required` 로 이루어집니다.
        2. `type` 은 `text`, `textarea`, `date`, `select`, `checkbox` 의 다섯 가지 값으로 이루어집니다.
        3. 회원 레코드에는 총 6개의 필드가 존재합니다. type, label, required 순으로 보면 아래와 같습니다.
            1. text, ‘이름‘, true
            2. text, ‘주소‘, false
            3. textarea, ‘메모‘, false
            4. date, ‘가입일‘, true
            5. select, ‘직업‘, false
                1. 개발자
                2. PO
                3. 디자이너
            6. checkbox, ‘이메일 수신 동의’, false
    4. **레코드**
        1. 레코드 목록을 테이블 형태로 볼 수 있어야 합니다.
            1. 각 필드가 column으로 제공되어야 합니다.
            2. 필드별로 filtering 할 수 있어야 합니다.
        2. 레코드를 추가할 수 있어야 합니다.
        3. 레코드를 삭제할 수 있어야 합니다.
        4. 레코드를 수정할 수 있어야 합니다.
            1. 레코드를 수정할 때, 타입별로 다른 input이 떠야 합니다.
        5. 초기 레코드는 `이름`, `주소`, `메모`, `가입일`, `직업`, `이메일 수신 동의` 순으로 보면 아래와 같습니다.
            1. John Doe, 서울 강남구, 외국인, 2024-10-02, 개발자, true
            2. Foo Bar, 서울 서초구, 한국인, 2024-10-01, PO, false
    5. **저장 기능**
        1. 개발 서버를 켤 때, `env`로 `STORAGE`를 `in-memory` 또는 `local-storage`로 설정 가능해야 합니다.
        2. `STORAGE`를 `local-storage`로 설정한다면 레코드들이 로컬 스토리지에 저장되어야 합니다. 즉, 개발 서버를 껐다 켜거나 브라우저를 새로고침 해도 데이터가 보존되어야 합니다.
