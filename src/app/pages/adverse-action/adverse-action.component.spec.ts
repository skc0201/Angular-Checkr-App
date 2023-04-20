import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdverseActionComponent } from './adverse-action.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { CandidateService } from 'src/app/shared/service/candidate.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
export class MatDialogMock {
  open() {
    return {
      afterClosed: () => of({action: true})
    };
  }
}

describe('AdverseActionComponent', () => {
  let component: AdverseActionComponent;
  let fixture: ComponentFixture<AdverseActionComponent>;
  let mockToolBarService;
  const locationStub = {
    back: jasmine.createSpy('back')
};

  const DataInfo = {
    id: 1,
    name: 'John Smith',
    adjudication: '',
    status: 'Clear',
    location: 'Barrouallie' ,
    date: '2/22/2022',
    dateofbirth:'1990-09-10 (26)' ,
    email: 'John.smith@checkr.com' ,
    phone: '(555) 555-5555',
    zip: '94158',
    licence: 'FTEST1111 (CA)',
    createdAt: 'Nov 29,2016 11:05:57 AM' ,
    completedDate: 'Dec 4, 2016 12:00:00 PM' ,
    tat: '1 Day , 14 hours'
 };

  beforeEach(async () => {
    mockToolBarService = jasmine.createSpyObj(['getCandidateDetailsById']);
    mockToolBarService.getCandidateDetailsById.and.returnValue(DataInfo);
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule ,
        HttpClientModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatDividerModule,
        MatCheckboxModule,
        BrowserAnimationsModule
      ],
      declarations: [ AdverseActionComponent ],
      providers:[{ provide: CandidateService, useValue: mockToolBarService } , {provide: Location, useValue: locationStub} ,
        { provide: MatDialog, useClass: MatDialogMock }
      ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdverseActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render adverse action page', () => {
    expect(component).toBeTruthy();
  });
  it('should have header in adverse action page', () => {
    const board = fixture.debugElement.query(By.css('.header-text')).nativeElement;
     expect(board.innerHTML).toEqual(component.DIALOGBOX_HEADER);
  });
  it('should render email and subject in adverse action page', () => {
    const board = fixture.debugElement.query(By.css('.email-content-1'));
    fixture.detectChanges();
    expect(board.childNodes[0].nativeNode.textContent.trim()).toEqual('Dear '+DataInfo.name+',');
  });
  it('should have Header for checkboxes', () => {
    const board = fixture.debugElement.query(By.css('.checkbox-header')).nativeElement;
     expect(board.innerHTML).toEqual(component.CHECKBOX_HEADER);
  });
  it('should have footer text', () => {
    const board = fixture.debugElement.query(By.css('.footer-text'));
    fixture.detectChanges();
    expect(board.childNodes[0].nativeNode.textContent).toEqual(component.ADVERSEACTION_FOOTER);
  });
  it('should have Button text', () => {
    const board = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(board.innerHTML).toEqual(component.ADVERSEACTION_BUTTON);
  });
  it('should  Button disables', () => {
    component.isButtonDisable = true;
    fixture.detectChanges();
    const board = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(board.disabled).toBeTruthy();
  });
  it('should  Button clickable', () => {
    component.isButtonDisable = true;
    fixture.detectChanges();
    const board = fixture.debugElement.query(By.css('button')).nativeElement;
    board.click();
  });
    it('should  Checkbox checked', () => {
const checkboxElem = fixture.debugElement.query(By.css('mat-checkbox')).nativeElement;
expect(checkboxElem.checked).toBeFalsy();
  });
  it('should  call on Init', () => {
    component.id =1;
    component.ngOnInit();
    fixture.detectChanges();
expect(component.candidateDetail).toEqual(DataInfo);
 });
 it('should  call on backButton func', () => {
  component.backButton();
  fixture.detectChanges();
  const location = fixture.debugElement.injector.get(Location);
  expect(location.pathname).not.toBeDefined();
});
it('should  call on onChecked func', () => {
  component.onChecked(1);
  fixture.detectChanges();
  expect(component.checkboxOptions).toBeDefined();
});
it('should  call dialog box', () => {
  component.id = 1;
  component.onButtonClick();
  fixture.detectChanges();
  expect(component.checkboxOptions).toBeDefined();
});
});
